import { FOLDER_Temp } from '@V1/Services/FileSystemService';
import ShareService from './ShareService';

export default class ExportService {
  static async shareFile(o: {
    filename: string
    data: string
    encoding: 'base64' | 'utf8'
  }): Promise<void> {
    const { filename, data, encoding } = o;
    const directory = await FOLDER_Temp.createFile({ filename, data, encoding });
    await ShareService.share({ directory });
    await FOLDER_Temp.deleteFile({ directory });
  }
}
