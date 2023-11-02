import { DownloadedProjectDTO, ProjectDTO } from '@Types/ProjectTypes';
import { ConfigDTO, CredentialDTO } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import DatabaseService from '@Services/DatabaseService';

export default class FetchAPIService {

  credential: CredentialDTO;
  endpoints = {
    AUTH: '/auth',
    PROJECT: '/project',
    IMAGE: '/image',
  };

  constructor(credential: CredentialDTO) {
    this.credential = credential;
  }

  // ===============================================================================================
  // App Endpoints Calls
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

  private async createProject(accessToken: string, signal: AbortSignal, project: ProjectDTO) {
    return fetch(this.credential.rootURL + this.endpoints.PROJECT, {
      signal: signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        project: project,
      }),
    });
  }

  private async updateProject(accessToken: string, signal: AbortSignal, project: ProjectDTO) {
    return fetch(this.credential.rootURL + this.endpoints.PROJECT + `/${project.projectSettings.id_project}`, {
      signal: signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        project: project,
      }),
    });
  }

  private async createImage(accessToken: string, signal: AbortSignal, id_project: string, id_picture: string, base64Data: string) {
    const formData = new FormData();
    formData.append('picture', base64Data);
    formData.append('id_project', id_project);
    formData.append('id_picture', id_picture);
    console.log('form data finished');
    return fetch(this.credential.rootURL + this.endpoints.IMAGE, {
      signal: signal,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-type': 'multipart/form-data',
      },
      body: formData,
    });
  }

  // ===============================================================================================
  // Endpoints manipulation
  // ===============================================================================================

  async downloadProjects(
    signal: AbortSignal,
    config: ConfigDTO,
    feedback: (message: string) => void,
    onSuccess: (projects: DownloadedProjectDTO[]) => void,
    onError: (error: string) => void,
  ): Promise<void> {

    const R = translations.APIServices.fetchAPI[config.language];

    try {

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
    config: ConfigDTO,
    feedback: (message: string) => void,
    onSuccess: () => void,
    onError: (error: string) => void,
  ) {

    const R = translations.APIServices.fetchAPI[config.language];

    try {

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
      feedback(R['Sending project:'] + ` ${this.credential.name}`);
      const response = projectDTO.projectSettings.status === 'new'
      ? await this.createProject(authBody.accessToken, signal, projectDTO)
      : await this.updateProject(authBody.accessToken, signal, projectDTO);
      if (!response.ok) {
        const serverMessage = response.headers.get('serverMessage');
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

  async uploadImages(
    options: {
      signal: AbortSignal,
      id_project: string,
      picturesIDs: string[],
      config: ConfigDTO,
    },
    onSuccess: () => void,
    onError: (error: string) => void,
    feedback: (message: string) => void,
  ) {

    const R = translations.APIServices.fetchAPI[options.config.language];

    try {

      // AUTHENTICATION ===========================
      feedback(R['Connecting to server:'] + ` ${this.credential.name}`);
      const authResponse = await this.auth(options.signal);
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
        onError(
          R['Credentials accepted, but no AccessToken was found. Contact the developer of this server.'] +
          R['\nMethod: POST'] +
          R['\nEndpoint: /auth'] +
          R['\nStatus: '] + authResponse.status +
          `\n{ ..., "accessToken: ${authBody.accessToken}" }`
        );
        return;
      }

      // POST ALL IMAGE ====================================================
      for (let i = 0; i < options.picturesIDs.length; i++) {

        const id_picture = options.picturesIDs[i];
        const base64data = await DatabaseService.getPictureData({
          id_project: options.id_project,
          id_picture: id_picture,
        });

        if (base64data !== null) {

          feedback(R['Sending image. ID:'] + ` ${id_picture}`);
          const response = await this.createImage(authBody.accessToken, options.signal, options.id_project, id_picture, base64data);
          if (!response.ok) {
            const serverMessage = response.headers.get('serverMessage');
            onError(
              R['Was not possible to upload a image to the server'] +
              `${serverMessage !== null ? `\nServer Message: ${serverMessage}` : ''}`
            );
            break;
          }

          onSuccess();

        } else {

          onError(R['Image not found. ID:'] + ` ${id_picture}`);
          continue;
        }
      }

    } catch (error) {

      if (error instanceof TypeError) {
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
