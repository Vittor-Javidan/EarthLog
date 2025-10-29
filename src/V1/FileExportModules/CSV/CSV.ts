import { path } from "@V1/Globals/Path";
import { FileSystemService } from "@V1/Services_Core/FileSystemService";
import { ShareService } from '@V1/Services_Core/ShareService';

export class Csv {
  static baseDirectory =  path.getDir().TEMP();

  static async createCSVFile(o: {
    fileName: string,
    data: string,
  }) {
    FileSystemService.writeFile({
      data: o.data,
      directory: `${this.baseDirectory}/${o.fileName}.csv`,
      encoding: 'utf8',
    })
  }

  static async shareFile(o: {
    fileName: string,
  }): Promise<void> {
    await ShareService.share({ directory: `${this.baseDirectory}/${o.fileName}.csv` });
  }

  static csvString(text: string): string {
    text = text.replace(/"/g, '""');                                                                // If the text contains double quotes, replace them with double double quotes for escaping
    if (text.includes('\n')) {                                                                      // If the text contains a line break (newline), enclose it in double quotes
      text = `"${text}"`;
    }
    if (text.includes(',') || text.startsWith("'")) {                                               // Enclose the text in double quotes if it contains the delimiter (comma) or if it starts with a single quote
      text = `"${text}"`;
    }
    return text;
  }
}