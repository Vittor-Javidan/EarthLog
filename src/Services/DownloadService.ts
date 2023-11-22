import { CredentialDTO } from '@Types/AppTypes';
import { ProjectSettings } from '@Types/ProjectTypes';
import DataProcessingService from './DataProcessingService';
import ProjectService from './ProjectService';
import MediaService from './MediaService';
import CacheService from './CacheService';
import SyncService from './SyncService';
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
    o.feedback('Connecting to server:' + ` ${this.restAPI.credential.name}`);
    this.accessToken = await this.restAPI.auth(o);
  }

  async getAvailableProjects(o: {
    signal: AbortSignal
    onSuccess: (projects: ProjectSettings[]) => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }): Promise<void> {
    try {

      this.accessToken ?? await this.getAccessToken(o);
      if (this.accessToken === null) {
        return;
      }

      o.feedback('fetching available projects');
      o.onSuccess(
        await this.restAPI.getAllProjects({
          ...o,
          accessToken: this.accessToken,
        })
      );

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

  async downloadProjects(o: {
    signal: AbortSignal
    projectIDs: string[]
    onFinish: () => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }): Promise<void> {
    try {

      this.accessToken ?? await this.getAccessToken(o);
      if (this.accessToken === null) {
        return;
      }

      for (let i = 0; i < o.projectIDs.length; i++) {

        const id_project = o.projectIDs[i];

        o.feedback('Downloading project. ID:' + ` ${id_project}`);
        const downloadedProject = await this.restAPI.getProject({
          ...o,
          accessToken: this.accessToken,
          id_project: id_project,
        });

        o.feedback('Processing project:' + ` ${downloadedProject.projectSettings.name}`);
        const processedProject = DataProcessingService.processProject_AfterDownload({
          ...o,
          projectDTO: downloadedProject,
        });

        o.feedback('Saving project');
        await ProjectService.createProject(processedProject,
        () => {
          CacheService.addToAllProjects(processedProject.projectSettings);
          SyncService.addToSyncData(processedProject.syncData);
        },
        (errorMessage) => o.onError(errorMessage),
        (feedbackMessage) => o.feedback(feedbackMessage));
      }

      o.onFinish();

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

  async downloadPictures(o: {
    signal: AbortSignal
    id_project: string
    picturesIDs: string[]
    onFinish: () => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }) {
    try {

      this.accessToken ?? await this.getAccessToken(o);
      if (this.accessToken === null) {
        return;
      }

      for (let i = 0; i < o.picturesIDs.length; i++) {

        if (o.signal.aborted) {
          o.feedback('Aborting.');
          o.onFinish();
          return;
        }

        o.feedback('Fetching picture. ID:' + ` ${o.picturesIDs[i]}`);
        const imageData = await this.restAPI.getPicture({
          ...o,
          accessToken: this.accessToken,
          id_picture: o.picturesIDs[i],
        });

        if (o.signal.aborted) {
          o.feedback('Aborting.');
          o.onFinish();
          return;
        }

        o.feedback('Saving picture.');
        await MediaService.savePicture(o.id_project, o.picturesIDs[i], imageData, 'download');
      }

      o.onFinish();

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
