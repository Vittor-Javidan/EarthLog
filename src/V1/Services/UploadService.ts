import { navigate } from '@V1/Globals/NavigationControler';
import { ConfigDTO, CredentialDTO } from '@V1/Types/AppTypes';
import DataProcessingService from './DataProcessingService';
import ProjectService from './ProjectService';
import MediaService from './MediaService';
import CacheService from './CacheService';
import RESTService from './RESTService';
import SyncService from './SyncService';

export default class UploadService {

  restAPI: RESTService;
  accessToken: string | null = null;

  constructor(credentials: CredentialDTO) {
    this.restAPI = new RESTService(credentials);
  }

  private async getAccessToken(o: {
    signal: AbortSignal
    onError: (errorMessage: string) => void
    feedback: (feedbackMessage: string) => void
  }): Promise<string> {
    o.feedback('Connecting to server');
    const accessToken = await this.restAPI.auth(o);
    this.accessToken = accessToken;
    return accessToken;
  }

  async uploadProject(o: {
    config: ConfigDTO
    signal: AbortSignal
    id_project: string
    onSuccess: () => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }): Promise<void> {
    try {

      const accessToken = this.accessToken ?? await this.getAccessToken(o);

      o.feedback('Building project');
      const projectDTO = await ProjectService.buildProjectDTO(o);

      o.feedback('Preparing project');
      DataProcessingService.processProject_BeforeUpload({ ...o, projectDTO,
        credential: this.restAPI.credential,
      });

      // UPLOAD PROJECT ==============
      o.feedback('Uploading project');
      projectDTO.projectSettings.status === 'new'
      ? await this.restAPI.postProject({ ...o, accessToken, projectDTO })
      : await this.restAPI.updateProject({ ...o, accessToken, projectDTO });

      o.feedback('Updating project locally');
      await ProjectService.updateProject({
        projectSettings: projectDTO.projectSettings,
        sync: false,
      }, async () => {
        CacheService.lastOpenProject = projectDTO.projectSettings;
        DataProcessingService.processProject_AfterUpload({ ...o, projectDTO });
        await SyncService.updateSyncData(projectDTO.syncData);
      }, (errorMessage) => { throw Error(errorMessage); });

      // UPLOAD MEDIA =================
      o.feedback('Uploading pictures');
      for (let id_picture in projectDTO.syncData.pictures) {
        if (projectDTO.syncData.pictures[id_picture] === 'new') {

          const base64Data = await MediaService.getPictureData({ ...o, id_picture });
          if (!base64Data) {
            throw Error('Attempt to upload a image not available on device.');
          }

          o.feedback('Uploading picture of ID: ' + id_picture);
          await this.restAPI.postPicture({ ...o, accessToken, id_picture, base64Data,
            syncData: projectDTO.syncData,
          });

          projectDTO.syncData.pictures[id_picture] = 'uploaded';
          await SyncService.updateSyncData(projectDTO.syncData);
        }
      }

      // AFTER UPLOAD =========================================
      const { rules, id_project } = projectDTO.projectSettings;
      const isAllPicturesUploaded = !Object.values(projectDTO.syncData.pictures).includes('new');

      if (rules.deleteAfterUpload === true && isAllPicturesUploaded) {

        o.feedback('Deleting project');
        await ProjectService.deleteProject(id_project, async () => {
          await CacheService.deleteLastOpenProject();
          navigate('HOME SCOPE');
        }, (errorMessage) => { throw Error(errorMessage); });

        return;
      }

      o.onSuccess();

    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'Network request failed': o.onError('Network request failed. Did your phone or server lose internet connection?'); break;
          default: o.onError(error.message);
        }
        return;
      }
    }
  }
}
