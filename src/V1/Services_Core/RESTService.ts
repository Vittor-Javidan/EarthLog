import { CredentialDTO } from '@V1/Types/AppTypes';
import { DownloadedProjectDTO, ProjectDTO, ProjectSettings, SyncData } from '@V1/Types/ProjectTypes';

export class RESTService {

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
    signal: AbortSignal
  }): Promise<string> {

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
        'The server did not recognize your credentials. Failed to authenticate.' +
        '\nMethod: POST' +
        '\nEndpoint: /auth' +
        '\nStatus: ' + response.status
      );
    }

    const body = await response.json();
    if (!body.accessToken) {
      throw Error(
        'Credentials accepted, but no accessToken was found.' +
        '\nMethod: POST' +
        '\nEndpoint: /auth' +
        '\nStatus: ' + response.status +
        `\n{ ..., "accessToken: ${body.accessToken}" }`
      );
    }

    return body.accessToken;
  }

  async getAllProjects(o: {
    accessToken: string
    signal: AbortSignal
  }): Promise<ProjectSettings[]> {

    const response = await fetch(this.credential.rootURL + this.endpoints.PROJECT, {
      signal: o.signal,
      method: 'GET',
      headers: {
        'Authorization': `${o.accessToken}`,
      },
    });

    if (!response.ok) {
      throw Error(
        'It was not possible to fetch available projects.' +
        '\nMethod: GET' +
        '\nEndpoint: /project' +
        '\nStatus: ' + response.status
      );
    }

    const body = await response.json();
    if (!body.projects) {
      throw Error(
        'Fetch was successful, but available projects are undefined.' +
        '\nMethod: GET' +
        '\nEndpoint: /project' +
        '\nStatus: ' + response.status +
        `\n{ ..., "projects: ${body.projects}" }`
      );
    }

    return body.projects;
  }

  async getProject(o: {
    accessToken: string
    signal: AbortSignal
    id_project: string
  }): Promise<DownloadedProjectDTO> {

    const response = await fetch(this.credential.rootURL + this.endpoints.PROJECT + `/${o.id_project}`, {
      signal: o.signal,
      method: 'GET',
      headers: {
        'Authorization': `${o.accessToken}`,
      },
    });

    if (!response.ok) {
      throw Error(
        'It was not possible to download the projects.' +
        '\nMethod: GET' +
        '\nEndpoint: /project' + `/${o.id_project}` +
        '\nStatus: ' + response.status
      );
    }

    const body = await response.json() as DownloadedProjectDTO;
    if (!body.project) {
      throw Error(
        'Download was successful, but the project is undefined.' +
        '\nMethod: GET' +
        '\nEndpoint: /project' + `/${o.id_project}` +
        '\nStatus: ' + response.status +
        `\n{ ..., "project: ${body.project}" }`
      );
    }
    if (!body.projectStatus) {
      throw Error(
        'Download was successful, but the projectStatus is undefined.' +
        '\nMethod: GET' +
        '\nEndpoint: /project' + `/${o.id_project}` +
        '\nStatus: ' + response.status +
        `\n{ ..., "projectStatus: ${body.projectStatus}" }`
      );
    }

    return body;
  }

  async postProject(o: {
    accessToken: string
    signal: AbortSignal
    projectDTO: ProjectDTO
    syncData: SyncData
  }): Promise<void> {

    const response = await fetch(this.credential.rootURL + this.endpoints.PROJECT, {
      signal: o.signal,
      method: 'POST',
      headers: {
        'Authorization': `${o.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: o.projectDTO,
        syncData: o.syncData,
      }),
    });

    if (!response.ok) {
      throw Error(
        'It was not possible to upload this project.' +
        '\nMethod: POST' +
        '\nEndpoint: /project' +
        '\nStatus: ' + response.status
      );
    }
  }

  async updateProject(o: {
    accessToken: string
    signal: AbortSignal
    projectDTO: ProjectDTO
    syncData: SyncData
  }): Promise<void> {

    const { id_project } = o.projectDTO.projectSettings;
    const response = await fetch(this.credential.rootURL + this.endpoints.PROJECT + `/${id_project}`, {
      signal: o.signal,
      method: 'POST',
      headers: {
        'Authorization': `${o.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project: o.projectDTO,
        syncData: o.syncData,
      }),
    });

    if (!response.ok) {
      throw Error(
        'It was not possible to upload this project.' +
        '\nMethod: POST' +
        '\nEndpoint: /project' + `/${id_project}` +
        '\nStatus: ' + response.status
      );
    }
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
        'Authorization': `${o.accessToken}`,
      },
    });

    if (!response.ok) {
      throw Error(
        'It was not possible to download the picture.' +
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

    return body.picture;
  }

  async postPicture(o: {
    accessToken: string
    signal: AbortSignal
    id_project: string
    id_picture: string
    base64Data: string
    syncData: SyncData
  }): Promise<void> {

    const response = await fetch(this.credential.rootURL + this.endpoints.IMAGE + `/${o.id_project}`, {
      signal: o.signal,
      method: 'POST',
      headers: {
        'Authorization': `${o.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_picture: o.id_picture,
        picture: o.base64Data,
        syncData: o.syncData,
      }),
    });

    if (!response.ok) {
      throw Error(
        'It was not possible to upload a the picture of ID ' + o.id_picture +
        '\nMethod: POST' +
        '\nEndpoint: /image' +
        '\nStatus: ' + response.status
      );
    }
  }
}
