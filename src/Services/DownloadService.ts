import { ConfigDTO, CredentialDTO } from '@Types/AppTypes';
import { ProjectSettings } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ProjectService from './ProjectService';
import CacheService from './CacheService';
import SyncService from './SyncService';
import MediaService from './MediaService';
import RESTService from './RESTService';
import DataProcessingService from './DataProcessingService';

export default class DownloadService {

  restAPI: RESTService;
  accessToken: string | null = null;

  constructor(credentials: CredentialDTO) {
    this.restAPI = new RESTService(credentials);
  }

  private async getAccessToken(o: {
    config: ConfigDTO
    signal: AbortSignal
    onError: (errorMessage: string) => void
    feedback: (feedbackMessage: string) => void
  }): Promise<void> {
    const R = translations.APIServices.fetchAPI[o.config.language];
    o.feedback(R['Connecting to server:'] + ` ${this.restAPI.credential.name}`);
    this.accessToken = await this.restAPI.auth(o);
  }

  async getAvailableProjects(o: {
    config: ConfigDTO
    signal: AbortSignal
    onSuccess: (projects: ProjectSettings[]) => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }): Promise<void> {

    const R = translations.APIServices.fetchAPI[o.config.language];

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
          case 'Network request failed': o.onError(R['Network request failed. Did your phone or server lose internet connection?']); break;
          default: o.onError(error.message);
        }
        return;
      }
    }
  }

  async downloadProjects(o: {
    config: ConfigDTO
    signal: AbortSignal
    projectIDs: string[]
    onFinish: () => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }): Promise<void> {

    const R = translations.APIServices.fetchAPI[o.config.language];
    const R2 = translations.APIServices.dataProcess[o.config.language];

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

        o.feedback(R2['Processing project:'] + ` ${downloadedProject.projectSettings.name}`);
        const processedProject = DataProcessingService.processDownloadedProject({
          ...o,
          projectDTO: downloadedProject,
        });

        o.feedback('Saving project');
        await ProjectService.createProject(processedProject, o.config,
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
          case 'Network request failed': o.onError(R['Network request failed. Did your phone or server lose internet connection?']); break;
          default: o.onError(error.message);
        }
        return;
      }
    }

  }

  async downloadImages(o: {
    config: ConfigDTO
    signal: AbortSignal
    id_project: string
    picturesIDs: string[]
    onFinish: () => void
    onError: (errorMessage: string) => void
    feedback: (message: string) => void
  }) {

    const R = translations.APIServices.fetchAPI[o.config.language];

    try {

      this.accessToken ?? await this.getAccessToken(o);
      if (this.accessToken === null) {
        return;
      }

      for (let i = 0; i < o.picturesIDs.length; i++) {

        o.feedback('Fetching image. ID:' + ` ${o.picturesIDs[i]}`);
        const imageData = await this.restAPI.getPicture({
          ...o,
          accessToken: this.accessToken,
          id_picture: o.picturesIDs[i],
        });

        o.feedback('Saving image.');
        await MediaService.savePicture(o.id_project, o.picturesIDs[i], imageData);
      }

      o.onFinish();

    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'Network request failed': o.onError(R['Network request failed. Did your phone or server lose internet connection?']); break;
          default: o.onError(error.message);
        }
        return;
      }
    }
  }
}
