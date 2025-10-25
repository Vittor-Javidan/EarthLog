import { useEffect } from 'react';
import { CameraLayerConfig, CameraPictureMode } from '@V2/Types/AppTypes';
import { PictureInputData, WidgetScope } from '@V2/Types/ProjectTypes';

/**
 * Custom hook that allows `<PictureInput />` to control `<CameraLayer />`.
 */
export function useCameraLayer(
  o: {
    scope: WidgetScope,
    config: CameraPictureMode,
    onPictureCallback: (id_picture: string) => void,
    onCameraClose: () => void,
  },
  deps: [PictureInputData, boolean]
) {
  const [inputData, openCamera] = deps;
  useEffect(() => {
    if (o.scope.type !== 'template') {
      CameraLayerAPI.configCamera(o.config);
      CameraLayerAPI.onPictureCallback(o.onPictureCallback);
      CameraLayerAPI.onCameraCloseCallback(o.onCameraClose);
      if (openCamera) {
        CameraLayerAPI.openCamera();
      }
    }
  }, [inputData, openCamera]);
}

/**
 * A service that works as an API between `<CameraLayer />` and `<PictureInput />`.
 */
export class CameraLayerAPI {

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

  /**
   * Allows `CameraService` to control the visibility of `<CameraLayer />`.
   */
  static registerShowSetter(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.showCameraSetter = setter;
  }

  /**
   * Camera `CameraService` to configure `<CameraLayer />`.
   */
  static registerConfigSetter(setter: React.Dispatch<React.SetStateAction<CameraLayerConfig | null>>) {
    this.cameraConfigSetter = setter;
  }

  /**
   * Allows `<PictureInput />` to open `<CameraLayer />`.
   */
  static openCamera() {
    this.setShowCamera(true);
  }

  /**
   * This allows `<CameraLayer />` to trigger the closing process defined by `<PictureInput />`. After that, it cleans `onCameraClose` and `onPictureTake` callbacks defined by `<PictureInput />`.
   */
  static closeCamera() {
    this.setShowCamera(false);
    if (this.onCameraClose !== null) {
      this.onCameraClose();
      this.onCameraClose = null;
      this.onPictureTake = null;
    }
  }

  /**
   * Allows `<PictureInput />` to configure `<CameraLayer />` with a custom set of rules.
   */
  static configCamera(config: CameraLayerConfig) {
    this.setConfig(config);
  }

  /**
   * Allows `<PictureInput />` to register a callback for when a picture is taken.
   */
  static onPictureCallback(onPictureTake: (id_picture: string) => void) {
    this.onPictureTake = onPictureTake;
  }

  /**
   * Allows `<PictureInput />` to register a callback for when the camera is closed.
   */
  static onCameraCloseCallback(onCameraClose: () => void) {
    this.onCameraClose = onCameraClose;
  }

  /**
   * Function called by `<CameraLayer />` to trigger the picture saving process.
   */
  static triggerOnPictureTake(id_picture: string) {
    if (this.onPictureTake !== null) {
      this.onPictureTake(id_picture);
    }
  }
}
