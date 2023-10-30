import DatabaseService from './DatabaseService';
import ShareService from './ShareService';

export default class ImageService {

  static getPictureUri(id_project: string, id_picture: string): string {
    return DatabaseService.getPictureUri(id_project, id_picture);
  }

  static async savePicture(id_project: string, id_picture: string, data: string): Promise<void> {
    await DatabaseService.savePicture(id_project, id_picture, data);
  }

  static async sharePicture(id_project: string, id_picture: string): Promise<void> {
    const imageFilePath = DatabaseService.getPictureUri(id_project, id_picture);
    await ShareService.share(imageFilePath);
  }

  static async savePictureFromURI(
    id_project: string,
    id_picture: string,
    photPath: string,
    onSave: () => void
  ): Promise<void> {
    await DatabaseService.savePictureFromUri(id_project, id_picture, photPath);
    onSave();
  }
}
