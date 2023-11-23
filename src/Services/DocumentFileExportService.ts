import FileSystemService, { AppPath } from '@Services/FileSystemService';
import ShareService from './ShareService';

export default class DocumentFileExportService {

  static async createTempFilesFolder(): Promise<void> {
    const databaseFolderContents = await FileSystemService.readDirectory(AppPath.TEMP);
    if (databaseFolderContents === null) {
      await FileSystemService.createDirectory(AppPath.TEMP);
    }
  }

  static async shareFile(filename: string, data: string, encoding: 'base64' | 'utf8'): Promise<void> {
    const filePath = `${AppPath.TEMP}/${filename}`;
    await FileSystemService.writeFile(filePath, data, encoding);
    await ShareService.share(filePath);
    await FileSystemService.delete(filePath);
  }

  static async deleteExportedFilesFolder(): Promise<void> {
    await FileSystemService.delete(AppPath.TEMP);
  }
}
