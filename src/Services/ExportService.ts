import { FOLDER_Temp } from '@Services/FileSystemService';
import ShareService from './ShareService';

export default class ExportService {
  static async shareFile(filename: string, data: string, encoding: 'base64' | 'utf8'): Promise<void> {
    const filePath = await FOLDER_Temp.createFile({ filename, data, encoding});
    await ShareService.share(filePath);
    await FOLDER_Temp.deleteFile(filePath);
  }
}
