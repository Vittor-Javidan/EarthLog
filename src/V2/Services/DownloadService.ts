import SubscriptionManager from '@SubscriptionManager';

import { ErrorCodes } from '@V2/Globals/ErrorsCodes';
import { CredentialDTO } from '@V2/Types/AppTypes';
import { ProjectSettings } from '@V2/Types/ProjectTypes';
import DataProcessingService from './DataProcessingService';
import ProjectService from './ProjectService';
import MediaService from './MediaService';
import CacheService from './CacheService';
import RESTService from './RESTService';

export default class DownloadService {

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
    o.feedback('Connecting to server:' + ` ${this.restAPI.credential.name}`);
    this.accessToken = await this.restAPI.auth({ signal });
  }

  async getAvailableProjects(o: {
    signal: AbortSignal
    onSuccess: (projects: ProjectSettings[]) => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }): Promise<void> {

    const { signal } = o;

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

      o.feedback('fetching available projects');
      o.onSuccess(
        await this.restAPI.getAllProjects({ accessToken: this.accessToken, signal })
      );

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

  async downloadProjects(o: {
    signal: AbortSignal
    projectIDs: string[]
    onFinish: () => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }): Promise<void> {

    const { signal, projectIDs } = o;

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

      for (let i = 0; i < projectIDs.length; i++) {

        const id_project = projectIDs[i];

        o.feedback('Downloading project. ID:' + ` ${id_project}`);
        const downloadedProjectDTO = await this.restAPI.getProject({ accessToken: this.accessToken, id_project, signal });

        if (SubscriptionManager.freeUserLimitCheck(downloadedProjectDTO.samples.length > 5)) {
          throw Error(ErrorCodes.FREE_USER_DOWNLOAD_RESTRICTION);
        }

        o.feedback('Processing project:' + ` ${downloadedProjectDTO.projectSettings.name}`);
        const { projectDTO, syncData } = DataProcessingService.processProject_AfterDownload({
          projectDTO: downloadedProjectDTO,
          feedback: (feedbackMessage) => o.feedback(feedbackMessage),
        });
        const { projectSettings } = projectDTO;

        o.feedback('Saving project');
        await ProjectService.createProject({
          projectDTO,
          syncData,
          onSuccess: () => {
            CacheService.addToAllProjects({ projectSettings });
            CacheService.addToSyncData({ syncData });
          },
          onError: (errorMessage) => {
            throw Error(errorMessage);
          },
          feedback: (feedbackMessage) => o.feedback(feedbackMessage),
        });
      }

      o.onFinish();

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

  async downloadPictures(o: {
    signal: AbortSignal
    id_project: string
    picturesIDs: string[]
    onFinish: () => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }) {

    const { signal, id_project, picturesIDs } = o;

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

      for (let i = 0; i < picturesIDs.length; i++) {

        const id_picture = picturesIDs[i];

        if (signal.aborted) {
          o.feedback('Aborting.');
          o.onFinish();
          return;
        }

        o.feedback('Fetching picture. ID:' + ` ${id_picture}`);
        const base64Data = await this.restAPI.getPicture({ signal, id_project, id_picture, accessToken: this.accessToken });

        if (o.signal.aborted) {
          o.feedback('Aborting.');
          o.onFinish();
          return;
        }

        o.feedback('Saving picture.');
        await MediaService.savePicture({ operation: 'download', id_project, id_picture, base64Data });
      }

      o.onFinish();

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
