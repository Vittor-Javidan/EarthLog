import * as Sharing from 'expo-sharing';

import FileSystemService from '@Services/FileSystemService';

export default class FileExportService {

  private static READY_FILES_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/ExportedFiles`;

  static async getAllExportedFileNames(): Promise<string[]> {
    return await FileSystemService.readDirectory(`${this.READY_FILES_DIRECTORY}`) ?? [];
  }

  static getFilePath(fileName: string) {
    return `${this.READY_FILES_DIRECTORY}/${fileName}`;
  }

  static async createExportedFilesFolder(): Promise<void> {
    const databaseFolderContents = await FileSystemService.readDirectory(this.READY_FILES_DIRECTORY);
    if (databaseFolderContents === null) {
      await FileSystemService.createDirectory(this.READY_FILES_DIRECTORY);
    }
  }

  static async deleteExportedFilesFolder(): Promise<void> {
    await FileSystemService.delete(this.READY_FILES_DIRECTORY);
  }

  static async saveAndShare(filename: string, data: string): Promise<void> {
    const filePath = `${this.READY_FILES_DIRECTORY}/${filename}`;
    await FileSystemService.writeFile(filePath, data, 'base64');
    await Sharing.shareAsync(filePath);
  }

  static async shareSavedFile(fileName: string): Promise<void> {
    const filePath = `${this.READY_FILES_DIRECTORY}/${fileName}`;
    await Sharing.shareAsync(filePath);
  }
}
