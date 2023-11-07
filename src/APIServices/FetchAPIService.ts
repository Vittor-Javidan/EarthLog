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

  private async getAccessToken(
    options: {
      signal: AbortSignal
      config: ConfigDTO
    },
    onError: (errorMessage: string) => void,
    feedback: (feedbackMessage: string) => void
  ): Promise<string | null> {

    const R = translations.APIServices.fetchAPI[options.config.language];

    feedback(R['Connecting to server:'] + ` ${this.credential.name}`);
    const authResponse = await this.auth(options.signal);
    if (!authResponse.ok) {
      onError(
        R['The server did not recognize your credentials. Failed to authenticate.'] +
        R['\nMethod: POST'] +
        R['\nEndpoint: /auth'] +
        R['\nStatus: '] + authResponse.status
      );
      return null;
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
      return null;
    }

    return authBody.accessToken;
  }

  async downloadProjects(
    options: {
      signal: AbortSignal,
      config: ConfigDTO,
    },
    onSuccess: (projects: DownloadedProjectDTO[]) => void,
    onError: (errorMessage: string) => void,
    feedback: (message: string) => void,
  ): Promise<void> {

    const R = translations.APIServices.fetchAPI[options.config.language];

    try {

      const accessToken = await this.getAccessToken({
        config:options.config,
        signal: options.signal,
      },
      (errorMessage) => onError(errorMessage),
      (feedbackMessage) => feedback(feedbackMessage));

      if (accessToken === null) {
        return;
      }

      feedback(R['Downloading projects']);
      const response = await this.getProjects(accessToken, options.signal);
      if (!response.ok) {
        onError(
          R['It was not possible to download projects. The endpoint request failed. Contact the developer of this server.'] +
          R['\nMethod: GET'] +
          R['\nEndpoint: /project'] +
          R['\nStatus: '] + response.status
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
          R['\nStatus: '] + response.status +
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

  async uploadProject(o: {
    config: ConfigDTO,
    signal: AbortSignal,
    projectDTO: ProjectDTO,
    onImageUpload: (id_UploadedPicture: string) => void,
    onSuccess: () => void,
    onProjectUploadError: (error: string) => void,
    onImageUploadError: (erroMessage: string) => void,
    feedback: (message: string) => void,
  }) {

    const R = translations.APIServices.fetchAPI[o.config.language];

    try {

      const accessToken = await this.getAccessToken({
        config: o.config,
        signal: o.signal,
      },
      (errorMessage) => o.onProjectUploadError(errorMessage),
      (feedbackMessage) => o.feedback(feedbackMessage));

      if (accessToken === null) {
        return;
      }

      o.feedback(R['Sending project:'] + ` ${this.credential.name}`);
      const response = o.projectDTO.projectSettings.status === 'new'
      ? await this.createProject(accessToken, o.signal, o.projectDTO)
      : await this.updateProject(accessToken, o.signal, o.projectDTO);
      if (!response.ok) {
        const serverMessage = response.headers.get('serverMessage');
        o.onProjectUploadError(
          R['It was not possible to upload this project. The endpoint request failed. Contact the developer of this server.'] +
          R['\nMethod: POST'] +
          R['\nEndpoint: /project'] +
          R['\nStatus: '] + response.status +
          `${serverMessage !== null ? `\nServer Message: ${serverMessage}` : ''}`
        );
        return;
      }

      await this.uploadImages({
        config: o.config,
        signal: o.signal,
        id_project: o.projectDTO.projectSettings.id_project,
        picturesIDs: Object.keys(o.projectDTO.syncData.pictures),
      },
      (id_UploadedPicture) => o.onImageUpload(id_UploadedPicture),
      (errorMessage) => o.onImageUploadError(errorMessage),
      (feedbackMessage) => o.feedback(feedbackMessage));

    } catch (error) {

      if (error instanceof TypeError) {
        switch (error.message) {
          case 'Network request failed': o.onProjectUploadError(R['Network request failed. Did your phone or server lose internet connection?']); break;
        }
        return;
      }

      o.onProjectUploadError(
        `${error}` +
        `\n${JSON.stringify(error)}`
      );
    }
  }

  /**
   * Stops uploading when a error occurs.
   */
  async uploadImages(
    options: {
      config: ConfigDTO,
      signal: AbortSignal,
      id_project: string,
      picturesIDs: string[],
      accessToken?: string,
    },
    onUpload: (id_UploadedPicture: string) => void,
    onError: (error: string) => void,
    feedback: (message: string) => void,
  ) {

    const { config, signal, id_project, picturesIDs } = options;
    const R = translations.APIServices.fetchAPI[options.config.language];

    try {

      const accessToken = options.accessToken ?? await this.getAccessToken({
        config: config,
        signal: signal,
      },
      (errorMessage) => onError(errorMessage),
      (feedbackMessage) => feedback(feedbackMessage));

      if (accessToken === null) {
        return;
      }

      for (let i = 0; i < picturesIDs.length; i++) {

        const id_picture = picturesIDs[i];
        const base64data = await DatabaseService.getPictureData({
          id_project: id_project,
          id_picture: id_picture,
        });

        if (base64data !== null) {

          feedback(R['Sending image. ID:'] + ` ${id_picture}`);
          const response = await this.createImage(accessToken, signal, id_project, id_picture, base64data);
          if (!response.ok) {
            const serverMessage = response.headers.get('serverMessage');
            onError(
              R['Error! Was not possible to upload a image to the server'] +
              `${serverMessage !== null ? `\nServer Message: ${serverMessage}` : ''}`
            );
            break;
          }

          onUpload(id_picture);

        } else {
          onError(R['Error! Image not found. ID:'] + ` ${id_picture}`);
          break;
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
