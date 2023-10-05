import { ProjectDTO } from '@Types/ProjectTypes';
import { CredentialDTO } from '@Types/AppTypes';

export default class AppAPI {

  credential: CredentialDTO;
  accessToken: string = '';
  endpoints = {
    AUTH: '/auth',
    PROJECT: '/projects',
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.credential.user,
        password: this.credential.password,
      }),
      signal: signal,
    });
  }

  private async getProjects(accessToken: string, signal: AbortSignal) {
    return fetch(this.credential.rootURL + this.endpoints.PROJECT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      signal: signal,
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
}
