import { CredentialDTO } from '@Types/AppTypes';
import FileSystemService from './FileSystemService';
import UtilService from './UtilService';

export default class CredentialService {

  private static CREDENTIAL_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/ServersCredentials`;

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
    await FileSystemService.delete(this.CREDENTIAL_DIRECTORY);
  }

  static async createCredentialsFolder(): Promise<void> {
    const folderContents = await FileSystemService.readDirectory(this.CREDENTIAL_DIRECTORY);
    if (folderContents === null) {

      // MAIN FOLDER
      await FileSystemService.createDirectory(this.CREDENTIAL_DIRECTORY);

      // CREDENTIALS FILE
      await FileSystemService.writeFile(
        `${this.CREDENTIAL_DIRECTORY}/index.json`,
        JSON.stringify([])
      );
    }
  }

  static async getAllCredentials(): Promise<CredentialDTO[]> {

    // READ CREDENTIALS
    const fileData = await FileSystemService.readFile(
      `${this.CREDENTIAL_DIRECTORY}/index.json`
    );
    return JSON.parse(fileData as string) as CredentialDTO[];
  }

  static async createCredential(newCredential: CredentialDTO): Promise<void> {

    // READ CREDENTIALS
    const fileData = await FileSystemService.readFile(
      `${this.CREDENTIAL_DIRECTORY}/index.json`
    );

    // ADD
    const allCredentials = [
      ...JSON.parse(fileData as string) as CredentialDTO[],
      newCredential,
    ];

    // SAVE
    await FileSystemService.writeFile(
      `${this.CREDENTIAL_DIRECTORY}/index.json`,
      JSON.stringify(allCredentials),
    );
  }

  static async updateCredential(credential: CredentialDTO): Promise<void> {

    // READ CREDENTIALS
    const fileData = await FileSystemService.readFile(
      `${this.CREDENTIAL_DIRECTORY}/index.json`
    );

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
    await FileSystemService.writeFile(
      `${this.CREDENTIAL_DIRECTORY}/index.json`,
      JSON.stringify(allCredentials),
    );
  }

  static async deleteCredential(credential: CredentialDTO): Promise<void> {

    // READ CREDENTIALS
    const fileData = await FileSystemService.readFile(
      `${this.CREDENTIAL_DIRECTORY}/index.json`
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
    await FileSystemService.writeFile(
      `${this.CREDENTIAL_DIRECTORY}/index.json`,
      JSON.stringify(allCredentials),
    );
  }
}
