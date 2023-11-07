import { translations } from '@Translations/index';
import { ConfigDTO, CredentialDTO } from '@Types/AppTypes';
import { DownloadedProjectDTO, ProjectDTO, ProjectSettings, SyncData } from '@Types/ProjectTypes';

export default class RESTService {

  credential: CredentialDTO;
  endpoints = {
    AUTH: '/auth',
    PROJECT: '/project',
    IMAGE: '/image',
  };

  constructor(credential: CredentialDTO) {
    this.credential = credential;
  }

  async auth(o: {
    config: ConfigDTO
    signal: AbortSignal
  }): Promise<string> {

    const R = translations.APIServices.fetchAPI[o.config.language];

    const response = await fetch(this.credential.rootURL + this.endpoints.AUTH, {
      signal: o.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.credential.user,
        password: this.credential.password,
      }),
    });

    if (!response.ok) {
      throw Error(
        R['The server did not recognize your credentials. Failed to authenticate.'] +
        R['\nMethod: POST'] +
        R['\nEndpoint: /auth'] +
        R['\nStatus: '] + response.status
      );
    }

    const body = await response.json();
    if (!body.accessToken) {
      throw Error(
        R['Credentials accepted, but no AccessToken was found. Contact the developer of this server.'] +
        R['\nMethod: POST'] +
        R['\nEndpoint: /auth'] +
        R['\nStatus: '] + response.status +
        `\n{ ..., "accessToken: ${body.accessToken}" }`
      );
    }

    return body.accessToken;
  }

  async getAllProjects(o: {
    config: ConfigDTO
    accessToken: string
    signal: AbortSignal
  }): Promise<ProjectSettings[]> {

    const R = translations.APIServices.fetchAPI[o.config.language];

    const response = await fetch(this.credential.rootURL + this.endpoints.PROJECT, {
      signal: o.signal,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${o.accessToken}`,
      },
    });

    if (!response.ok) {
      throw Error(
        'It was not possible to fetch available projects. The endpoint request failed. Contact the developer of this server.' +
        R['\nMethod: GET'] +
        R['\nEndpoint: /project'] +
        R['\nStatus: '] + response.status
      );
    }

    const body = await response.json();
    if (!body.projects) {
      throw Error(
        'Fetch was successful, but available projects are undefined.' +
        R['\nMethod: GET'] +
        R['\nEndpoint: /project'] +
        R['\nStatus: '] + response.status +
        `\n{ ..., "projects: ${body.projects}" }`
      );
    }

    return body.projects;
  }

  async getProject(o: {
    config: ConfigDTO,
    accessToken: string
    signal: AbortSignal
    id_project: string
  }): Promise<DownloadedProjectDTO> {

    const R = translations.APIServices.fetchAPI[o.config.language];

    const response = await fetch(this.credential.rootURL + this.endpoints.PROJECT + `/${o.id_project}`, {
      signal: o.signal,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${o.accessToken}`,
      },
    });

    if (!response.ok) {
      throw Error(
        R['It was not possible to download projects. The endpoint request failed. Contact the developer of this server.'] +
        R['\nMethod: GET'] +
        R['\nEndpoint: /project'] + `/${o.id_project}` +
        R['\nStatus: '] + response.status
      );
    }

    const body = await response.json();
    if (!body.project) {
      throw Error(
        'Download was successful, but projects is undefined.' +
        R['\nMethod: GET'] +
        R['\nEndpoint: /project'] + `/${o.id_project}` +
        R['\nStatus: '] + response.status +
        `\n{ ..., "projects: ${body.project}" }`
      );
    }

    return body.project;
  }

  async postProject(o: {
    accessToken: string
    signal: AbortSignal
    project: ProjectDTO
  }): Promise<Response> {
    return fetch(this.credential.rootURL + this.endpoints.PROJECT, {
      signal: o.signal,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${o.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: o.project,
      }),
    });
  }

  async updateProject(o: {
    accessToken: string
    signal: AbortSignal
    project: ProjectDTO
  }): Promise<Response> {
    return fetch(this.credential.rootURL + this.endpoints.PROJECT + `/${o.project.projectSettings.id_project}`, {
      signal: o.signal,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${o.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: o.project,
      }),
    });
  }

  async getPicture(o: {
    accessToken: string
    signal: AbortSignal
    id_project: string
    id_picture: string
  }): Promise<string> {

    const response = await fetch(this.credential.rootURL + this.endpoints.IMAGE + `/${o.id_project}/${o.id_picture}`, {
      signal: o.signal,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${o.accessToken}`,
      },
    });

    if (!response.ok) {
      throw Error(
        'It was not possible to download projects. The endpoint request failed. Contact the developer of this server.' +
        '\nMethod: GET' +
        '\nEndpoint: /image' + `/${o.id_project}/${o.id_picture}` +
        '\nStatus: ' + response.status
      );
    }

    const body = await response.json();
    if (!body.picture) {
      throw Error(
        'Download was successful, but image is undefined.' +
        '\nMethod: GET' +
        '\nEndpoint: /image' + `/${o.id_project}/${o.id_picture}` +
        '\nStatus: ' + response.status +
        `\n{ ..., "image: ${body.picture}" }`
      );
    }

    return body.image;
  }

  async postPicture(o: {
    accessToken: string
    signal: AbortSignal
    id_project: string
    id_picture: string
    base64Data: string
    syncData: SyncData
  }): Promise<Response> {
    const formData = new FormData();
    formData.append('id_project', o.id_project);
    formData.append('id_picture', o.id_picture);
    formData.append('picture', o.base64Data);
    formData.append('syncData', JSON.stringify(o.syncData));
    console.log('form data finished');
    return fetch(this.credential.rootURL + this.endpoints.IMAGE, {
      signal: o.signal,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${o.accessToken}`,
        'Content-type': 'multipart/form-data',
      },
      body: formData,
    });
  }
}
