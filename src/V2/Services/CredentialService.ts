import { CredentialDTO } from '@V2/Types/AppTypes';
import { FOLDER_Credentials } from './FileSystemService';
import IDService from './IDService';

export default class CredentialService {

  static allCredentials: CredentialDTO[] = [];

  static getNewCredential(): CredentialDTO {
    return {
      credential_id: IDService.generateUuidV4(),
      name: '',
      user: '',
      password: '',
      rootURL: '',
    };
  }

  static async loadAllCredentials(): Promise<void> {
    this.allCredentials = await FOLDER_Credentials.getAll();
  }

  // ===============================================================================================
  // CREDENTIAL FILES/FOLDER MANIPULATION METHODS
  // ===============================================================================================

  static async createCredential(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    await FOLDER_Credentials.create({ credential });
    this.allCredentials = [ ...this.allCredentials, credential ];
  }

  static async updateCredential(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    await FOLDER_Credentials.update({ credential });
  }

  static async deleteCredential(o: {
    credential: CredentialDTO
  }): Promise<void> {
    const { credential } = o;
    await FOLDER_Credentials.delete({ credential });
    const index = this.allCredentials.findIndex(c => c.credential_id === credential.credential_id);
    if (index !== -1) {
      this.allCredentials.splice(index, 1);
    }
  }
}
