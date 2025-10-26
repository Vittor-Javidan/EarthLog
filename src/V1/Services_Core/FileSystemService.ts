import { Directory, File } from 'expo-file-system';
import { path } from '@V1/Globals/Path'

export class FileSystemService {

  /**
   * Creates a new directory if not exist.
   * @param directory directory path
   */
  static createDirectory(o: {
    directory: string
  }): void {
    const { directory } = o;
    const dir = new Directory(directory);
    if (!dir.exists) {
      try {
        dir.create();
      } catch (error) {
        console.error(`Error creating directory ${directory}:`, error);
      }
    }
  }

  /**
   * Reads directory folders and file names if exists. Return null otherwise
   * @param directory directory path
   */
  static readDirectory(o: {
    directory: string
  }): string[] | null {
    const { directory } = o;
    const dir = new Directory(directory);
    if (dir.exists) {
      const contents = dir.list();
      const stringContents: string[] = contents.map((item: File | Directory) => item.name);
      return stringContents;
    }
    return null;
  }

  /**
   * Update or create a file for a given directory.
   * @param directory directory of the file, with file name included.
   * @param data stringfied data to be saved on the file.
   */
  static writeFile(o: {
    directory: string,
    data: string,
    encoding: 'utf8' | 'base64'
  }): void {
    const { directory, data, encoding } = o;
    const file = new File(directory);
    file.write(data, { encoding });
  }

  /**
   * Reads a file. Return a string if exists, null otherwise.
   * @param directory directory of the file, with file name included.
   */
  static readFile(o: {
    directory: string,
    encoding: 'utf8' | 'base64'
  }): string | null {
    const { directory, encoding } = o;
    const file = new File(directory);
    if (!file.exists) { return null; }
    switch (encoding) {
      case 'base64': return file.base64Sync();
      case 'utf8':   return file.textSync();
    }
  }

  /**
   * Deletes a directory recusively if exists. If a file is specified on the delete path, only the
   * file will be deleted.
   * @param directory directory, with file name included or not.
   */
  static delete(o: {
    directory: string
  }): void {
    const { directory } = o;
    const dir = new Directory(directory);
    if (dir.exists) {
      this.deleteRecursively(dir);
    }
  }

  private static deleteRecursively(directory: Directory): void {
    const contents = directory.list();
    for (const item of contents) {
      if (item instanceof Directory) {
        this.deleteRecursively(item);
      } else {
        item.delete();
      }
    }
    directory.delete();
  }

  static resetTempDirectory(): void {
    FileSystemService.delete({ directory: path.getDir().TEMP() });
    FileSystemService.createDirectory({ directory: path.getDir().TEMP() });
  }
}
