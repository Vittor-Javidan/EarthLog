import { CameraLayerConfig } from '@Types/AppTypes';
import FileSystemService from './FileSystemService';
import UtilService from './UtilService';
import DatabaseService from './DatabaseService';

export default class CameraService {

  private static showCameraSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;
  private static cameraConfigSetter: React.Dispatch<React.SetStateAction<CameraLayerConfig>> | null = null;
  private static onPictureTake: ((id_photo: string) => void) | null = null;
  private static onCameraClose: (() => void) | null = null;

  private static setShowCamera(boolean: boolean) {
    if (this.showCameraSetter !== null) {
      this.showCameraSetter(boolean);
    }
  }

  private static setConfig(config: CameraLayerConfig) {
    if (this.cameraConfigSetter !== null) {
      this.cameraConfigSetter(config);
    }
  }

  static registerShowSetter(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.showCameraSetter = setter;
  }

  static registerConfigSetter(setter: React.Dispatch<React.SetStateAction<CameraLayerConfig>>) {
    this.cameraConfigSetter = setter;
  }

  static configCamera(config: CameraLayerConfig) {
    this.setConfig(config);
  }

  static onPictureCallback(onPictureTake: (id_picture: string) => void) {
    this.onPictureTake = onPictureTake;
  }

  static onCameraCloseCallback(onCameraClose: () => void) {
    this.onCameraClose = onCameraClose;
  }

  static openCamera() {
    this.setShowCamera(true);
  }

  static closeCamera() {
    this.setShowCamera(false);
    if (this.onCameraClose !== null) {
      this.onCameraClose();
      this.onCameraClose = null;
    }
  }

  /**
   * This async method is not meant to be used with await. The user is to not block the UI for the
   * next picture while the old is being saved.
   */
  static async savePicture(id_project: string, photoUri: string): Promise<void> {
    const data = await FileSystemService.readFile(photoUri, 'base64');
    if (data !== null && this.onPictureTake !== null) {
      const id_picture = UtilService.generateUuidV4();
      await DatabaseService.savePicture(id_project, id_picture, data);
      this.onPictureTake(id_picture);
    }
  }

  static getPictureUri(id_project: string, id_picture: string) {
    return DatabaseService.getPictureUri(id_project, id_picture);
  }
}
