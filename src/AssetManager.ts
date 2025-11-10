import { Asset } from "expo-asset";

export type MapAssets = 'SATELLITE_INPUT' | 'INFO_SAMPLE' | 'INFO_PROJECT' | 'USER_LAST_KNOWN_LOCATION'
export class AssetManager {

  private static MARKERS: {
    SATELLITE_INPUT: Asset,
    INFO_SAMPLE: Asset,
    INFO_PROJECT: Asset,
    USER_LAST_KNOWN_LOCATION: Asset,
  }

  static async loadAssetsAsync() {

    // XSM
    const satelliteInput        = Asset.fromModule(require('@Assets/marker_satellite_input.png'));
    const infoSample            = Asset.fromModule(require('@Assets/marker_info_sample.png'));
    const infoProject           = Asset.fromModule(require('@Assets/marker_info_project.png'));
    const userLastKnownLocation = Asset.fromModule(require('@Assets/marker_user_last_known_location.png'));

    this.MARKERS = {
      SATELLITE_INPUT:          await satelliteInput.downloadAsync(),
      INFO_SAMPLE:              await infoSample.downloadAsync(),
      INFO_PROJECT:             await infoProject.downloadAsync(),
      USER_LAST_KNOWN_LOCATION: await userLastKnownLocation.downloadAsync(),
    }
  }

  static getMarkerImage(type: MapAssets): string {
    switch (type) {
      case 'SATELLITE_INPUT':          return AssetManager.MARKERS.SATELLITE_INPUT.localUri as string;
      case 'INFO_SAMPLE':              return AssetManager.MARKERS.INFO_SAMPLE.localUri as string;
      case 'INFO_PROJECT':             return AssetManager.MARKERS.INFO_PROJECT.localUri as string;
      case 'USER_LAST_KNOWN_LOCATION': return AssetManager.MARKERS.USER_LAST_KNOWN_LOCATION.localUri as string;
    }
  }
}