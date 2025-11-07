import { ErrorCodes } from '@V1/Globals/ErrorsCodes';
import { ConfigDTO, CredentialDTO } from '@V1/Types/AppTypes';

import { RESTService } from '@V1/Services_Core/RESTService';
import { DataProcessingService } from './DataProcessingService';
import { ProjectService } from './ProjectService';
import { MediaService } from './MediaService';
import { CacheService } from './CacheService';

export class UploadService {

  restAPI: RESTService;
  accessToken: string | null = null;

  constructor(credentials: CredentialDTO) {
    this.restAPI = new RESTService(credentials);
  }

  private async getAccessToken(o: {
    signal: AbortSignal
    onError: (errorMessage: string) => void
    feedback: (feedbackMessage: string) => void
  }): Promise<void> {
    const { signal } = o;
    o.feedback('Connecting to server');
    const accessToken = await this.restAPI.auth({ signal });
    this.accessToken = accessToken;
  }

  async uploadProject(o: {
    config: ConfigDTO
    signal: AbortSignal
    id_project: string
    onSuccess: () => void
    onProjectDeletion: () => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }): Promise<void> {

    const { config, signal, id_project } = o;

    try {

      this.accessToken ?? await this.getAccessToken({
        signal,
        feedback: (feedbackMessage) => o.feedback(feedbackMessage),
        onError: (errorMessage) => {
          throw Error(errorMessage);
        },
      });

      if (this.accessToken === null) {
        throw Error(ErrorCodes.SERVER_DID_NOT_RETURN_ACCESS_TOKEN);
      }

      o.feedback('Building project');
      const projectDTO = await ProjectService.buildProjectDTO({
        id_project,
        feedback: (feedbackMessage) => o.feedback(feedbackMessage),
      });
      const { projectSettings } = projectDTO;
      await CacheService.loadAllSyncData();
      const syncData = CacheService.getSyncDataFromCache({ id_project });

      o.feedback('Preparing project');
      DataProcessingService.processProject_BeforeUpload({
        config,
        projectDTO,
        credential: this.restAPI.credential,
        feedback: (feedbackMessage) => o.feedback(feedbackMessage),
      });

      // UPLOAD PROJECT ==============
      o.feedback('Uploading project');
      syncData.project === 'new'
      ? await this.restAPI.postProject({ signal, accessToken: this.accessToken, projectDTO, syncData })
      : await this.restAPI.updateProject({ signal, accessToken: this.accessToken, projectDTO, syncData });

      // AFTER UPLOAD ==================
      o.feedback('Updating project locally');
      await ProjectService.updateProject({
        projectSettings,
        sync: false,
        onSuccess: () => {
          CacheService.lastOpenProject = projectSettings;
        },
        onError: (errorMessage) => {
          throw Error(errorMessage);
        },
      });

      o.feedback('Project sync...');
      DataProcessingService.processProject_AfterUpload({
        syncData: syncData,
        feedback: (feedbackMessage) => o.feedback(feedbackMessage),
      });
      await ProjectService.updateSyncData({
        syncData,
        onSuccess: () => {
          CacheService.updateCache_SyncData({ syncData });
        },
        onError: (errorMessage) => {
          throw Error(errorMessage);
        },
      });

      // UPLOAD MEDIA =================
      o.feedback('Uploading pictures');
      for (let id_picture in syncData.pictures) {
        if (syncData.pictures[id_picture] === 'new') {

          const base64Data = await MediaService.getPictureData({ ...o, id_picture });
          if (!base64Data) {
            throw Error(ErrorCodes.ATTEMPT_TO_UPLOAD_A_NOT_AVAILABLE_PICTURE);
          }

          o.feedback('Uploading picture of ID: ' + id_picture);
          await this.restAPI.postPicture({ id_picture, base64Data, id_project, signal,
            accessToken: this.accessToken,
            syncData: projectSettings.rules.sendSyncDataOnlyOnce ? null : syncData,
          });

          o.feedback('Picture sync...');
          syncData.pictures[id_picture] = 'uploaded';
          await ProjectService.updateSyncData({
            syncData,
            onSuccess: () => {
              CacheService.updateCache_SyncData({ syncData });
            },
            onError: (errorMessage) => {
              throw Error(errorMessage);
            },
          });
        }
      }

      // AFTER MEDIA UPLOAD =========================================

      // Remove deleted pictures from Sync Data after all pictures have been uploaded
      for (let id_picture in syncData.pictures) {
        if (syncData.pictures[id_picture] === 'deleted') {
          o.feedback('Cleaning unnecessary deleted picture entries...');
          delete syncData.pictures[id_picture]
        }
      }
      await ProjectService.updateSyncData({
        syncData,
        onSuccess: () => {
          CacheService.updateCache_SyncData({ syncData });
        },
        onError: (errorMessage) => {
          throw Error(errorMessage);
        },
      });

      // Project rule deleteAfterUpload
      const isAllPicturesUploaded = !Object.values(syncData.pictures).includes('new');
      if (projectSettings.rules.deleteAfterUpload === true && isAllPicturesUploaded) {
        o.feedback('Deleting project');
        await ProjectService.deleteProject({ id_project,
          onSuccess: async () => {
            await CacheService.deleteLastOpenProject();
            o.onProjectDeletion();
          },
          onError: (errorMessage) => {
            throw Error(errorMessage);
          }}
        );
      }

      o.onSuccess();

    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'Network request failed': o.onError(ErrorCodes.NETWORK_NOT_AVAILABLE); break;
          default: o.onError(error.message);
        }
        return;
      }
    }
  }
}
