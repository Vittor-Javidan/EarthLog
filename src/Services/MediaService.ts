import { InputData, WidgetData } from '@Types/ProjectTypes';
import DatabaseService from './DatabaseService';
import ShareService from './ShareService';

export default class MediaService {

  // ===============================================================================================
  // MEDIA
  // ===============================================================================================

  static async deleteMedia(
    options: {
      scope: 'sample'
      id_project: string
      widgetArray: WidgetData[]
    } | {
      scope: 'widget'
      id_project: string
      widget: WidgetData
    } | {
      scope: 'input'
      id_project: string
      input: InputData
    } | {
      scope: 'picture'
      id_project: string
      id_media: string
    },
    onFinish: () => void
  ): Promise<void> {
    await DatabaseService.deleteMedia(options);
    onFinish();
  }

  // ===============================================================================================
  // PICTURES
  // ===============================================================================================

  static async sharePicture(id_project: string, id_picture: string): Promise<void> {
    const imageFilePath = DatabaseService.getPictureUri(id_project, id_picture);
    await ShareService.share(imageFilePath);
  }

  static getPictureUri(id_project: string, id_picture: string): string {
    return DatabaseService.getPictureUri(id_project, id_picture);
  }

  static async savePicture(id_project: string, id_picture: string, data: string): Promise<void> {
    await DatabaseService.savePicture(id_project, id_picture, data);
  }

  static async savePictureFromURI(
    options: {
      id_project: string,
      id_picture: string,
      photoUri: string,
    },
    onSave: () => void
  ): Promise<void> {
    await DatabaseService.savePictureFromUri(options, onSave);
  }
}
