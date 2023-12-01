import { CameraLayerConfig } from '@V1/Types/AppTypes';

export default class CameraService {

  private static showCameraSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;
  private static cameraConfigSetter: React.Dispatch<React.SetStateAction<CameraLayerConfig | null>> | null = null;
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

  static registerConfigSetter(setter: React.Dispatch<React.SetStateAction<CameraLayerConfig | null>>) {
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

  static triggerOnPictureTake(id_picture: string) {
    if (this.onPictureTake !== null) {
      this.onPictureTake(id_picture);
    }
  }
}
