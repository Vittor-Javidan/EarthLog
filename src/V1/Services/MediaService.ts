import { InputData, WidgetData } from '@V1/Types/ProjectTypes';
import DatabaseService from './DatabaseService';
import ShareService from './ShareService';

export default class MediaService {

  // ===============================================================================================
  // MEDIA
  // ===============================================================================================

  static async deleteMediaRecursively(o: {
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
    await DatabaseService.deleteMediaRecursively(o);
  }

  // ===============================================================================================
  // PICTURES
  // ===============================================================================================

  static async sharePicture(id_project: string, id_picture: string): Promise<void> {
    const imageFilePath = DatabaseService.getPictureUri({ id_project, id_picture });
    await ShareService.share({ directory: imageFilePath });
  }

  static getPictureUri(id_project: string, id_picture: string): string {
    return DatabaseService.getPictureUri({ id_project, id_picture });
  }

  static async getPictureData(o: {
    id_project: string
    id_picture: string
  }): Promise<string | null> {
    return DatabaseService.getPictureData(o);
  }

  static async savePicture(o: {
    id_project: string,
    id_picture: string,
    base64Data: string,
    operation: 'creation' | 'download'
  }): Promise<void> {
    await DatabaseService.savePicture(o);
  }

  static async savePictureFromURI(o: {
    id_project: string,
    id_picture: string,
    photoUri: string,
    onSave: () => void
  }): Promise<void> {
    await DatabaseService.savePictureFromUri(o);
  }
}
