import { useEffect } from "react";

export function useCameraPreviewLayer(
  o: {
    onSavePicture: () => void,
    onClosePreview: () => void,
  },
  deps: [string | null, boolean]
) {
  const [pictureUri, openPreview] = deps;
  useEffect(() => {
    if (openPreview) {
      CameraPreviewLayerAPI.openPreview(pictureUri);
      CameraPreviewLayerAPI.onSavePictureCallback(o.onSavePicture);
      CameraPreviewLayerAPI.onClosePreviewCallback(o.onClosePreview);
      if (openPreview) {
        CameraPreviewLayerAPI.openPreview(pictureUri);
      }
    }
  }, [pictureUri, openPreview]);
}

export class CameraPreviewLayerAPI {

  private static pictureUriSetter: React.Dispatch<React.SetStateAction<string | null>> | null = null;
  private static onSavePicture: (() => void) | null = null;
  private static onClosePreview: (() => void) | null = null;

  static setPictureUri(string: string | null) {
    if (this.pictureUriSetter !== null) {
      this.pictureUriSetter(string);
    }
  }

  static registerPictureUriSetter(setter: React.Dispatch<React.SetStateAction<string | null>>) {
    this.pictureUriSetter = setter;
  }

  static openPreview(string: string | null) {
    if (this.pictureUriSetter !== null) {
      this.pictureUriSetter(string)
    }
  }

  static closePreview() {
    this.setPictureUri(null);
    if (this.onClosePreview !== null) {
      this.onClosePreview();
      this.onClosePreview = null;
      this.onSavePicture = null;
    }
  }

  static onSavePictureCallback(callback: () => void) {
    this.onSavePicture = callback;
  }

  static onClosePreviewCallback(callback: () => void) {
    this.onClosePreview = callback;
  }

  static savePicture() {
    if (this.onSavePicture !== null) {
      this.onSavePicture();
    }
  }
}