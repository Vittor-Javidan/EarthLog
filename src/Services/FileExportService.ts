import * as Sharing from 'expo-sharing';

import FileSystemService from '@Services/FileSystemService';

export default class FileExportService {

  private static READY_FILES_DIRECTORY = `${FileSystemService.APP_MAIN_DIRECTORY}/ExportedFiles`;

  static async shareFile(filename: string, data: string, encoding: 'base64' | 'utf8'): Promise<void> {
    const filePath = `${this.READY_FILES_DIRECTORY}/${filename}`;
    await FileSystemService.writeFile(filePath, data, encoding);
    await Sharing.shareAsync(filePath);
    await FileSystemService.delete(filePath);
  }

  static async createTempFilesFolder(): Promise<void> {
    const databaseFolderContents = await FileSystemService.readDirectory(this.READY_FILES_DIRECTORY);
    if (databaseFolderContents === null) {
      await FileSystemService.createDirectory(this.READY_FILES_DIRECTORY);
    }
  }

  static async deleteExportedFilesFolder(): Promise<void> {
    await FileSystemService.delete(this.READY_FILES_DIRECTORY);
  }
}
