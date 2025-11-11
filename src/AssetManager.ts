import { Asset } from "expo-asset";

export type MapAssets = 'SATELLITE_INPUT' | 'INFO_SAMPLE' | 'INFO_PROJECT' | 'USER_LAST_KNOWN_LOCATION'
export type CompassAssets = 'COMPASS_BG' | 'COMPASS_POINTER';
export class AssetManager {

  private static COMPASS: {
    COMPASS_BG: Asset,
    COMPASS_POINTER: Asset,
  }
  private static MARKERS: {
    SATELLITE_INPUT: Asset,
    INFO_SAMPLE: Asset,
    INFO_PROJECT: Asset,
    USER_LAST_KNOWN_LOCATION: Asset,
  }

  static async loadAssetsAsync() {

    // MAP MARKERS
    const satelliteInput        = Asset.fromModule(require('@Assets/marker_satellite_input.png'));
    const infoSample            = Asset.fromModule(require('@Assets/marker_info_sample.png'));
    const infoProject           = Asset.fromModule(require('@Assets/marker_info_project.png'));
    const userLastKnownLocation = Asset.fromModule(require('@Assets/marker_user_last_known_location.png'));

    // COMPASS
    const compass_bg      = Asset.fromModule(require('@Assets/compass.png'));
    const compass_pointer = Asset.fromModule(require('@Assets/compass_pointer.png'));


    this.MARKERS = {
      SATELLITE_INPUT:          await satelliteInput.downloadAsync(),
      INFO_SAMPLE:              await infoSample.downloadAsync(),
      INFO_PROJECT:             await infoProject.downloadAsync(),
      USER_LAST_KNOWN_LOCATION: await userLastKnownLocation.downloadAsync(),
    }

    this.COMPASS = {
      COMPASS_BG:      await compass_bg.downloadAsync(),
      COMPASS_POINTER: await compass_pointer.downloadAsync(),
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

  static getCompassImage(type: CompassAssets): string {
    switch (type) {
      case 'COMPASS_BG':      return AssetManager.COMPASS.COMPASS_BG.localUri as string;
      case 'COMPASS_POINTER': return AssetManager.COMPASS.COMPASS_POINTER.localUri as string;
    }
  }
}
