import * as ExpoFileSystem from 'expo-file-system';

export default class FileSystemService {

  static APP_MAIN_DIRECTORY = `${ExpoFileSystem.documentDirectory?.slice(0, -1)}`;

  /**
   * Deletes a directory recusively if exists. If a file is specified on the delete path, only the
   * file will be deleted.
   * @param directory directory, with file name included or not.
   */
  static async delete(directory: string): Promise<void> {
    const directoryExists = (await ExpoFileSystem.getInfoAsync(directory)).exists;
    if (directoryExists) {
      await ExpoFileSystem.deleteAsync(directory);
    }
  }

  /**
   * Reads directory folders and file names if exists. Return null otherwise
   * @param directory directory path
   */
  static async readDirectory(directory: string): Promise<string[] | null> {
    const directoryExists = (await ExpoFileSystem.getInfoAsync(directory)).exists;
    if (directoryExists) {
      return await ExpoFileSystem.readDirectoryAsync(directory);
    }
    return null;
  }

  /**
   * Creates a new directory if not exist.
   * @param directory directory path
   */
  static async createDirectory(directory: string): Promise<void> {
    const directoryExists = (await ExpoFileSystem.getInfoAsync(directory)).exists;
    if (!directoryExists) {
      await ExpoFileSystem.makeDirectoryAsync(directory);
    }
  }

  /**
   * Reads a file. Return a string if exists, null otherwise.
   * @param directory directory of the file, with file name included.
   */
  static async readFile(directory: string): Promise<string | null> {
    const directoryExists = (await ExpoFileSystem.getInfoAsync(directory)).exists;
    if (directoryExists) {
      return await ExpoFileSystem.readAsStringAsync(directory, {encoding: 'utf8'});
    }
    return null;
  }

  /**
   * Update or create a file for a given directory.
   * @param directory directory of the file, with file name included.
   * @param data stringfied data to be saved on the file.
   */
  static async writeFile(directory: string, data: string, encoding?: 'utf8' | 'base64'): Promise<void> {
    await ExpoFileSystem.writeAsStringAsync(directory, data, { encoding: encoding ?? 'utf8' });
  }
}
