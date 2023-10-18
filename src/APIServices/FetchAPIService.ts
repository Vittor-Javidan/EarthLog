import { DownloadedProjectDTO, ProjectDTO } from '@Types/ProjectTypes';
import { CredentialDTO } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default class FetchAPIService {

  credential: CredentialDTO;
  endpoints = {
    AUTH: '/auth',
    PROJECT: '/project',
  };

  constructor(credential: CredentialDTO) {
    this.credential = credential;
  }

  // ===============================================================================================
  // App Endpoints
  // ===============================================================================================

  private async auth(
    signal: AbortSignal,
  ): Promise<Response> {
    return fetch(this.credential.rootURL + this.endpoints.AUTH, {
      signal: signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.credential.user,
        password: this.credential.password,
      }),
    });
  }

  private async getProjects(accessToken: string, signal: AbortSignal) {
    return fetch(this.credential.rootURL + this.endpoints.PROJECT, {
      signal: signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }

  private async postProject(accessToken: string, signal: AbortSignal, project: ProjectDTO) {
    return fetch(this.credential.rootURL + this.endpoints.PROJECT, {
      signal: signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        projects: [ project ],
      }),
    });
  }

  // ===============================================================================================
  // Endpoints manipulation
  // ===============================================================================================

  async downloadProjects(
    signal: AbortSignal,
    feedback: (message: string) => void,
    onSuccess: (projects: DownloadedProjectDTO[]) => void,
    onError: (error: string) => void,
  ): Promise<void> {
    try {

      const R = translations.APIServices.fetchAPI[ConfigService.config.language];

      // AUTHENTICATION ===========================
      feedback(R['Connecting to server:'] + ` ${this.credential.name}`);
      const authResponse = await this.auth(signal);
      if (!authResponse.ok) {
        onError(
          R['The server did not recognize your credentials. Failed to authenticate.'] +
          R['\nMethod: POST'] +
          R['\nEndpoint: /auth'] +
          R['\nStatus: '] + authResponse.status
        );
        return;
      }

      feedback(R['Authenticated']);
      const authBody = await authResponse.json();
      if (!authBody.accessToken) {
        onError(
          R['Credentials accepted, but no AccessToken was found. Contact the developer of this server.'] +
          R['\nMethod: POST'] +
          R['\nEndpoint: /auth'] +
          R['\nStatus: '] + authResponse.status +
          `\n{ ..., "accessToken: ${authBody.accessToken}" }`
        );
        return;
      }

      // GET PROJECTS ======================================================
      feedback(R['Downloading projects']);
      const response = await this.getProjects(authBody.accessToken, signal);
      if (!response.ok) {
        onError(
          R['It was not possible to download projects. The endpoint request failed. Contact the developer of this server.'] +
          R['\nMethod: GET'] +
          R['\nEndpoint: /project'] +
          R['\nStatus: '] + authResponse.status
        );
        return;
      }

      feedback(R['Opening projects']);
      const body = await response.json();
      if (!body.projects || body.projects.length <= 0) {
        onError(
          R['Projects download request was successful, but no projects were found.'] +
          R['\nMethod: GET'] +
          R['\nEndpoint: /project'] +
          R['\nStatus: '] + authResponse.status +
          `\n{ ..., "projects: ${response.status}" }`
        );
        return;
      }

      onSuccess(body.projects);

    } catch (error) {

      if (error instanceof TypeError) {
        const R = translations.APIServices.fetchAPI[ConfigService.config.language];
        switch (error.message) {
          case 'Network request failed': onError(R['Network request failed. Did your phone or server lose internet connection?']); break;
        }
        return;
      }

      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  async uploadProject(
    signal: AbortSignal,
    projectDTO: ProjectDTO,
    feedback: (message: string) => void,
    onSuccess: () => void,
    onError: (error: string) => void,
  ) {
    try {

      const R = translations.APIServices.fetchAPI[ConfigService.config.language];

      // AUTHENTICATION ===========================
      feedback(R['Connecting to server:'] + ` ${this.credential.name}`);
      const authResponse = await this.auth(signal);
      if (!authResponse.ok) {
        onError(
          R['The server did not recognize your credentials. Failed to authenticate.'] +
          R['\nMethod: POST'] +
          R['\nEndpoint: /auth'] +
          `\nStatus: ${authResponse.status}.`
        );
        return;
      }

      const authBody = await authResponse.json();
      feedback(R['Authenticated']);
      if (!authBody.accessToken) {
        const R = translations.APIServices.fetchAPI[ConfigService.config.language];
        onError(
          R['Credentials accepted, but no AccessToken was found. Contact the developer of this server.'] +
          R['\nMethod: POST'] +
          R['\nEndpoint: /auth'] +
          R['\nStatus: '] + authResponse.status +
          `\n{ ..., "accessToken: ${authBody.accessToken}" }`
        );
        return;
      }

      // POST PROJECT ======================================================
      feedback(R['Sending to server:'] + ` ${this.credential.name}`);
      const response = await this.postProject(authBody.accessToken, signal, projectDTO);
      if (!response.ok) {
        const serverMessage = response.headers.get('serverMessage');
        const R = translations.APIServices.fetchAPI[ConfigService.config.language];
        onError(
          R['It was not possible to upload this project. The endpoint request failed. Contact the developer of this server.'] +
          R['\nMethod: POST'] +
          R['\nEndpoint: /project'] +
          R['\nStatus: '] + authResponse.status +
          `${serverMessage !== null ? `\nServer Message: ${serverMessage}` : ''}`
        );
        return;
      }

      onSuccess();

    } catch (error) {

      if (error instanceof TypeError) {
        const R = translations.APIServices.fetchAPI[ConfigService.config.language];
        switch (error.message) {
          case 'Network request failed': onError(R['Network request failed. Did your phone or server lose internet connection?']); break;
        }
        return;
      }

      onError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }
}
