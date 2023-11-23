import { CredentialDTO } from '@Types/AppTypes';
import FileSystemService, { AppPath } from './FileSystemService';
import UtilService from './UtilService';

export default class CredentialService {

  private static CREDENTIALS_FILE_PATH  = `${AppPath.CREDENTIALS}/index.json`;
  static allCredentials: CredentialDTO[] = [];

  // ===============================================================================================
  // CACHE METHODS
  // ===============================================================================================

  static async loadAllCredentials(): Promise<void> {
    this.allCredentials = await CredentialService.getAllCredentials();
  }

  // ===============================================================================================
  // DATA CREATION
  // ===============================================================================================

  static getNewCredential(): CredentialDTO {
    return {
      credential_id: UtilService.generateUuidV4(),
      name: '',
      user: '',
      password: '',
      rootURL: '',
    };
  }

  // ===============================================================================================
  // CREDENTIAL FILES/FOLDER MANIPULATION METHODS
  // ===============================================================================================

  static async deleteCredentialsFolder(): Promise<void> {
    await FileSystemService.delete(AppPath.CREDENTIALS);
  }

  static async createCredentialsFolder(): Promise<void> {
    const folderContents = await FileSystemService.readDirectory(AppPath.CREDENTIALS);
    if (folderContents === null) {

      // MAIN FOLDER
      await FileSystemService.createDirectory(AppPath.CREDENTIALS);

      // CREDENTIALS FILE
      await FileSystemService.writeFile(this.CREDENTIALS_FILE_PATH, JSON.stringify([]));
    }
  }

  static async getAllCredentials(): Promise<CredentialDTO[]> {

    // READ CREDENTIALS
    const fileData = await FileSystemService.readFile(this.CREDENTIALS_FILE_PATH);
    return JSON.parse(fileData as string) as CredentialDTO[];
  }

  static async createCredential(newCredential: CredentialDTO): Promise<void> {

    // READ CREDENTIALS
    const fileData = await FileSystemService.readFile(this.CREDENTIALS_FILE_PATH);

    // ADD
    const allCredentials = [
      ...JSON.parse(fileData as string) as CredentialDTO[],
      newCredential,
    ];

    // SAVE
    await FileSystemService.writeFile(this.CREDENTIALS_FILE_PATH, JSON.stringify(allCredentials));

    // ADD TO CACHE
    this.allCredentials = [...this.allCredentials, newCredential];
  }

  static async updateCredential(credential: CredentialDTO): Promise<void> {

    // READ CREDENTIALS
    const fileData = await FileSystemService.readFile(this.CREDENTIALS_FILE_PATH);

    // PARSE DATA
    const allCredentials = JSON.parse(fileData as string) as CredentialDTO[];

    // UPDATE
    for (let i = 0; i < allCredentials.length; i++) {
      if (allCredentials[i].credential_id === credential.credential_id) {
        allCredentials[i] = credential;
        break;
      }
    }

    // SAVE
    await FileSystemService.writeFile(this.CREDENTIALS_FILE_PATH, JSON.stringify(allCredentials));
  }

  static async deleteCredential(credential: CredentialDTO): Promise<void> {

    // READ CREDENTIALS
    const fileData = await FileSystemService.readFile(
      this.CREDENTIALS_FILE_PATH
    );

    // PARSE DATA
    const allCredentials = JSON.parse(fileData as string) as CredentialDTO[];

    // REMOVE
    for (let i = 0; i < allCredentials.length; i++) {
      if (allCredentials[i].credential_id === credential.credential_id) {
        allCredentials.splice(i, 1);
        break;
      }
    }

    // SAVE
    await FileSystemService.writeFile(this.CREDENTIALS_FILE_PATH, JSON.stringify(allCredentials));

    // REMOVE FROM CACHE
    for (let i = 0; i < this.allCredentials.length; i++) {
      if (this.allCredentials[i].credential_id === credential.credential_id) {
        this.allCredentials.splice(i, 1);
      }
    }
  }
}
