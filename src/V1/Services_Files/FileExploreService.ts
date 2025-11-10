import { Directory, File } from 'expo-file-system';
import { path } from '@V1/Globals/Path'

export type FileType = {
  type: 'file',
  name: string,
} | {
  type: 'directory',
  name: string,
}

export class FileExploreService {

  static LTS_ROOT_PATH: string = path.getDir().ROOT();
  static currentPath: string = this.LTS_ROOT_PATH;

  static listCurrentDirectoryItems(): FileType[] {
    const dir = new Directory(this.currentPath);
    return dir.list().map((item: File | Directory) => {
      return {
        type: item instanceof Directory ? 'directory' : 'file',
        name: item.name
      };
    });
  }
  
  static openFolder(file: FileType): FileType[] {
    if (file.type === 'directory') {
      this.currentPath = `${this.currentPath}/${file.name}`;
    }
    return this.listCurrentDirectoryItems();
  }

  static closeFolder(): FileType[] {
    if (this.currentPath !== this.LTS_ROOT_PATH) {
      const pathParts = this.currentPath.split('/');
      pathParts.pop();
      this.currentPath = pathParts.join('/');
      return this.listCurrentDirectoryItems();
    }
    return this.goToRoot()
  }

  static goToRoot(): FileType[] {
    this.currentPath = this.LTS_ROOT_PATH;
    return this.listCurrentDirectoryItems();
  }

  static closeExplorer(): void {
    this.currentPath = this.LTS_ROOT_PATH;
  }

  static openJsonFile(directory: string): string {
    const file = new File(directory);
    const fileContent = file.textSync();
    const jsonObject = JSON.parse(fileContent);
    return JSON.stringify(jsonObject, null, 2);
  }
}
