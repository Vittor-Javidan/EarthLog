import { InputData, WidgetData } from '@Types/ProjectTypes';
import DatabaseService from './DatabaseService';
import ShareService from './ShareService';

export default class MediaService {

  // ===============================================================================================
  // MEDIA
  // ===============================================================================================

  static async deleteMedia(o: {
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
  }): Promise<void> {
    await DatabaseService.deleteMedia(o);
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

  static async getPictureData(o: {
    id_project: string
    id_picture: string
  }): Promise<string | null> {
    return DatabaseService.getPictureData(o);
  }

  static async savePicture(
    id_project: string,
    id_picture: string,
    data: string,
    operation: 'creation' | 'download'
  ): Promise<void> {
    await DatabaseService.savePicture(id_project, id_picture, data, operation);
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
