import { ProjectDTO } from '@Types/ProjectTypes';
import { CredentialDTO } from '@Types/AppTypes';

export default class AppAPI {

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
    onSuccess: (projects: ProjectDTO[]) => void,
    onError: (error: string) => void,
  ): Promise<void> {
    try {

      // AUTHENTICATION ===========================
      const authResponse = await this.auth(signal);
      if (!authResponse.ok) {
        onError(
          'The server did not recognize your credentials. Failed to authenticate.' +
          '\nMethod: POST' +
          '\nEndpoint: /auth' +
          `\nStatus: ${authResponse.status}.`
        );
        return;
      }

      const authBody = await authResponse.json();
      if (!authBody.accessToken) {
        onError(
          'Credentials accepted, but no AccessToken was found. Contact the developer of this server.' +
          '\nMethod: POST' +
          '\nEndpoint: /auth' +
          `\nStatus: ${authResponse.status}` +
          `\n{ ..., "accessToken: ${authBody.accessToken}" }`
        );
        return;
      }

      // GET PROJECTS ======================================================
      const response = await this.getProjects(authBody.accessToken, signal);
      if (!response.ok) {
        onError(
          'It was not possible to download projects. The endpoint request failed. Contact the developer of this server.' +
          '\nMethod: GET' +
          '\nEndpoint: /project' +
          `\nStatus: ${response.status}`
        );
        return;
      }

      const body = await response.json();
      if (!body.projects || body.projects.length <= 0) {
        onError(
          'Projects download request was successful, but no projects were found.' +
          '\nMethod: GET' +
          '\nEndpoint: /project' +
          `\nStatus: ${body.status}` +
          `\n{ ..., "projects: ${response.status}" }`
        );
        return;
      }

      onSuccess(body.projects);

    } catch (error) {

      if (error instanceof TypeError) {
        switch (error.message) {
          case 'Network request failed': onError('Network request failed. Did your phone or server lose internet connection?'); break;
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
    onSuccess: () => void,
    onError: (error: string) => void,
  ) {
    try {

      // AUTHENTICATION ===========================
      const authResponse = await this.auth(signal);
      if (!authResponse.ok) {
        onError(
          'The server did not recognize your credentials. Failed to authenticate.' +
          '\nMethod: POST' +
          '\nEndpoint: /auth' +
          `\nStatus: ${authResponse.status}.`
        );
        return;
      }

      const authBody = await authResponse.json();
      if (!authBody.accessToken) {
        onError(
          'Credentials accepted, but no AccessToken was found. Contact the developer of this server.' +
          '\nMethod: POST' +
          '\nEndpoint: /auth' +
          `\nStatus: ${authResponse.status}` +
          `\n{ ..., "accessToken: ${authBody.accessToken}" }`
        );
        return;
      }

      // POST PROJECT ======================================================
      const response = await this.postProject(authBody.accessToken, signal, projectDTO);
      if (!response.ok) {
        const serverMessage = response.headers.get('serverMessage');
        onError(
          'It was not possible to upload this project. The endpoint request failed. Contact the developer of this server.' +
          '\nMethod: POST' +
          '\nEndpoint: /project' +
          `\nStatus: ${response.status}` +
          `${serverMessage !== null ? `\nServer Message: ${serverMessage}` : ''}`
        );
        return;
      }

      onSuccess();

    } catch (error) {

      if (error instanceof TypeError) {
        switch (error.message) {
          case 'Network request failed': onError('Network request failed. Did your phone or server lose internet connection?'); break;
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
