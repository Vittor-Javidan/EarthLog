import { ShareService } from '@V2/Services_Core/ShareService';
import { FOLDER_Temp } from '@V2/Services_Files/AppFolders';

export class ExportService {
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
