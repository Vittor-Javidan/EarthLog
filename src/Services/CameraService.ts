import { CameraLayerConfig } from '@Types/AppTypes';

export default class CameraService {

  private static showCameraSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;
  private static cameraConfigSetter: React.Dispatch<React.SetStateAction<CameraLayerConfig>> | null = null;
  private static onPictureTake: ((id_photo: string) => void) | ((id_photo: string) => Promise<void>) | null = null;

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

  static registerShowSetter(
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this.showCameraSetter = setter;
  }

  static registerConfigSetter(
    setter: React.Dispatch<React.SetStateAction<CameraLayerConfig>>
  ) {
    this.cameraConfigSetter = setter;
  }

  static async handleCamera(config: CameraLayerConfig,  onPictureTake: (id_photo: string) => void) {
    this.onPictureTake = onPictureTake;
    this.setConfig(config);
    this.setShowCamera(true);
  }

  static async sendPictureId(id_photo: string) {
    if (this.onPictureTake !== null) {
      await this.onPictureTake(id_photo);
    }
  }
}
