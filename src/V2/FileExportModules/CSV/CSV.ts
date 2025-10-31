import { path } from "@V2/Globals/Path";
import { FileSystemService } from "@V2/Services_Core/FileSystemService";

export class Csv {

  static exportDirectory =  path.getDir().EXPORTED_FILES();

  static createCSVFile(o: {
    fileName: string;
    data: string;
    number?: number;
  }): string {

    const { data, fileName } = o;
    const extension = 'csv';
    const newFileName = FileSystemService.handleDuplicatedFileNames({
      fileName, extension,
      directory: this.exportDirectory,
    });

    const directory = `${this.exportDirectory}/${newFileName}.csv`;
    FileSystemService.writeFile({
      data, directory,
      encoding: "utf8",
    });

    return directory;
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