import { path } from "@V1/Globals/Path";
import { FileSystemService } from "@V1/Services_Core/FileSystemService";

export class ExportedFilesService {

  static baseDirectory: string = path.getDir().EXPORTED_FILES();

  static listContents(): string[] {
    const contents = FileSystemService.readDirectory({
      directory: this.baseDirectory,
    });
    return contents ?? [];
  }

  static deleteFile(fileName: string): void {
    FileSystemService.deleteFile({
      directory: `${this.baseDirectory}/${fileName}`,
    });
  }
}