import { Asset } from "expo-asset";

export type MapAssets = (
  'SATELLITE_INPUT' | 'INFO_SAMPLE' | 'INFO_PROJECT' | 'USER_LAST_KNOWN_LOCATION' |
  'DIRECTION_ONE' | 'DIRECTION_TWO' | 'DEXTRAL' | 'SINISTRAL' |
  'SURFACE_1' | 'SURFACE_2'
)
export type CompassAssets = (
  'COMPASS_BG'           | 'COMPASS_POINTER'           | 'COMPASS_BG_MINI'           |
  'COMPASS_BUBBLE_LEVEL' | 'COMPASS_BUBBLE_LEVEL_GRID' | 'COMPASS_BUBBLE_LEVEL_MINI'
)

export type TutorialAssets = 'TUTORIAL_BUBBLE_LEVEL_SURFACE_ANGLE' | 'TUTORIAL_BUBBLE_LEVEL_BASE_ROTATION'

export class AssetManager {

  private static COMPASS: {
    COMPASS_BG: Asset,
    COMPASS_BG_MINI: Asset,
    COMPASS_POINTER: Asset,
    COMPASS_BUBBLE_LEVEL: Asset,
    COMPASS_BUBBLE_LEVEL_MINI: Asset,
    COMPASS_BUBBLE_LEVEL_GRID: Asset,
  }
  private static MARKERS: {
    SATELLITE_INPUT: Asset,
    INFO_SAMPLE: Asset,
    INFO_PROJECT: Asset,
    USER_LAST_KNOWN_LOCATION: Asset,
    DIRECTION_ONE: Asset,
    DIRECTION_TWO: Asset,
    DEXTRAL: Asset,
    SINISTRAL: Asset,
    SURFACE_1: Asset,
    SURFACE_2: Asset,
  }
  private static TUTORIAL: {
    TUTORIAL_BUBBLE_LEVEL_SURFACE_ANGLE: Asset,
    TUTORIAL_BUBBLE_LEVEL_BASE_ROTATION: Asset,
  }

  static async loadAssetsAsync() {

    // MAP MARKERS
    const satelliteInput        = Asset.fromModule(require('@Assets/marker_satellite_input.png'));
    const infoSample            = Asset.fromModule(require('@Assets/marker_info_sample.png'));
    const infoProject           = Asset.fromModule(require('@Assets/marker_info_project.png'));
    const userLastKnownLocation = Asset.fromModule(require('@Assets/marker_user_last_known_location.png'));
    const marker_direction_one  = Asset.fromModule(require('@Assets/marker_direction_one.png'));
    const marker_direction_two  = Asset.fromModule(require('@Assets/marker_direction_two.png'));
    const marker_dextral        = Asset.fromModule(require('@Assets/marker_dextral.png'));
    const marker_sinistral      = Asset.fromModule(require('@Assets/marker_sinistral.png'));
    const marker_surface_1      = Asset.fromModule(require('@Assets/marker_surface_1.png'));
    const marker_surface_2      = Asset.fromModule(require('@Assets/marker_surface_2.png'));

    // COMPASS
    const compass_bg                = Asset.fromModule(require('@Assets/compass.png'));
    const compass_bg_mini           = Asset.fromModule(require('@Assets/compass_mini.png'));
    const compass_pointer           = Asset.fromModule(require('@Assets/compass_pointer.png'));
    const compass_bubble_level      = Asset.fromModule(require('@Assets/compass_bubble_level.png'));
    const compass_bubble_level_mini = Asset.fromModule(require('@Assets/compass_bubble_level_mini.png'));
    const compass_bubble_level_grid = Asset.fromModule(require('@Assets/compass_bubble_level_grid.png'));

    // TUTORIAL
    const tutorial_bubble_level_surface_angle = Asset.fromModule(require('@Assets/tutorial_bubble_level_surface_angle.png'));
    const tutorial_bubble_level_base_rotation = Asset.fromModule(require('@Assets/tutorial_bubble_level_base_rotation.png'));

    this.MARKERS = {
      SATELLITE_INPUT:          await satelliteInput.downloadAsync(),
      INFO_SAMPLE:              await infoSample.downloadAsync(),
      INFO_PROJECT:             await infoProject.downloadAsync(),
      USER_LAST_KNOWN_LOCATION: await userLastKnownLocation.downloadAsync(),
      DIRECTION_ONE:            await marker_direction_one.downloadAsync(),
      DIRECTION_TWO:            await marker_direction_two.downloadAsync(),
      DEXTRAL:                  await marker_dextral.downloadAsync(),
      SINISTRAL:                await marker_sinistral.downloadAsync(),
      SURFACE_1:                await marker_surface_1.downloadAsync(),
      SURFACE_2:                await marker_surface_2.downloadAsync(),
    }

    this.COMPASS = {
      COMPASS_BG:                await compass_bg.downloadAsync(),
      COMPASS_BG_MINI:           await compass_bg_mini.downloadAsync(),
      COMPASS_POINTER:           await compass_pointer.downloadAsync(),
      COMPASS_BUBBLE_LEVEL:      await compass_bubble_level.downloadAsync(),
      COMPASS_BUBBLE_LEVEL_MINI: await compass_bubble_level_mini.downloadAsync(),
      COMPASS_BUBBLE_LEVEL_GRID: await compass_bubble_level_grid.downloadAsync(),
    }

    this.TUTORIAL = {
      TUTORIAL_BUBBLE_LEVEL_SURFACE_ANGLE: await tutorial_bubble_level_surface_angle.downloadAsync(),
      TUTORIAL_BUBBLE_LEVEL_BASE_ROTATION: await tutorial_bubble_level_base_rotation.downloadAsync(),
    }
  }

  static getMarkerImage(type: MapAssets): string {
    switch (type) {
      case 'SATELLITE_INPUT':          return AssetManager.MARKERS.SATELLITE_INPUT.localUri as string;
      case 'INFO_SAMPLE':              return AssetManager.MARKERS.INFO_SAMPLE.localUri as string;
      case 'INFO_PROJECT':             return AssetManager.MARKERS.INFO_PROJECT.localUri as string;
      case 'USER_LAST_KNOWN_LOCATION': return AssetManager.MARKERS.USER_LAST_KNOWN_LOCATION.localUri as string;
      case 'DIRECTION_ONE':            return AssetManager.MARKERS.DIRECTION_ONE.localUri as string;
      case 'DIRECTION_TWO':            return AssetManager.MARKERS.DIRECTION_TWO.localUri as string;
      case 'DEXTRAL':                  return AssetManager.MARKERS.DEXTRAL.localUri as string;
      case 'SINISTRAL':                return AssetManager.MARKERS.SINISTRAL.localUri as string;
      case 'SURFACE_1':                return AssetManager.MARKERS.SURFACE_1.localUri as string;
      case 'SURFACE_2':                return AssetManager.MARKERS.SURFACE_2.localUri as string;
    }
  }

  static getCompassImage(type: CompassAssets): string {
    switch (type) {
      case 'COMPASS_BG':                return AssetManager.COMPASS.COMPASS_BG.localUri as string;
      case 'COMPASS_BG_MINI':           return AssetManager.COMPASS.COMPASS_BG_MINI.localUri as string;
      case 'COMPASS_POINTER':           return AssetManager.COMPASS.COMPASS_POINTER.localUri as string;
      case 'COMPASS_BUBBLE_LEVEL':      return AssetManager.COMPASS.COMPASS_BUBBLE_LEVEL.localUri as string;
      case 'COMPASS_BUBBLE_LEVEL_MINI': return AssetManager.COMPASS.COMPASS_BUBBLE_LEVEL_MINI.localUri as string;
      case 'COMPASS_BUBBLE_LEVEL_GRID': return AssetManager.COMPASS.COMPASS_BUBBLE_LEVEL_GRID.localUri as string;
    }
  }

  static getTutorialImage(type: TutorialAssets): string {
    switch (type) {
      case 'TUTORIAL_BUBBLE_LEVEL_SURFACE_ANGLE': return AssetManager.TUTORIAL.TUTORIAL_BUBBLE_LEVEL_SURFACE_ANGLE.localUri as string;
      case 'TUTORIAL_BUBBLE_LEVEL_BASE_ROTATION': return AssetManager.TUTORIAL.TUTORIAL_BUBBLE_LEVEL_BASE_ROTATION.localUri as string;
    }
  }
}