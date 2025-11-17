import { Asset } from "expo-asset";

export const MarkerAssets = [
  'SURFACE_1'       , 'SURFACE_2'       , 'DIRECTION_ONE'       , 'DIRECTION_TWO'       , 'DEXTRAL'       , 'SINISTRAL'       ,
  'SURFACE_1_BLUE'  , 'SURFACE_2_BLUE'  , 'DIRECTION_ONE_BLUE'  , 'DIRECTION_TWO_BLUE'  , 'DEXTRAL_BLUE'  , 'SINISTRAL_BLUE'  ,
  'SURFACE_1_GREEN' , 'SURFACE_2_GREEN' , 'DIRECTION_ONE_GREEN' , 'DIRECTION_TWO_GREEN' , 'DEXTRAL_GREEN' , 'SINISTRAL_GREEN' ,
  'SURFACE_1_PURPLE', 'SURFACE_2_PURPLE', 'DIRECTION_ONE_PURPLE', 'DIRECTION_TWO_PURPLE', 'DEXTRAL_PURPLE', 'SINISTRAL_PURPLE',
  'SURFACE_1_RED'   , 'SURFACE_2_RED'   , 'DIRECTION_ONE_RED'   , 'DIRECTION_TWO_RED'   , 'DEXTRAL_RED'   , 'SINISTRAL_RED'   ,
  'SURFACE_1_YELLOW', 'SURFACE_2_YELLOW', 'DIRECTION_ONE_YELLOW', 'DIRECTION_TWO_YELLOW', 'DEXTRAL_YELLOW', 'SINISTRAL_YELLOW',
] as const;
export type MarkerAssets = typeof MarkerAssets[number];
export type MapAssets = (
  MarkerAssets | 'SATELLITE_INPUT' | 'INFO_SAMPLE' | 'INFO_PROJECT' | 'USER_LAST_KNOWN_LOCATION'
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

    // MAP
    SATELLITE_INPUT: Asset,
    INFO_SAMPLE: Asset,
    INFO_PROJECT: Asset,
    USER_LAST_KNOWN_LOCATION: Asset,

    // MEASUREMENTS
    DIRECTION_ONE: Asset,
    DIRECTION_TWO: Asset,
    DEXTRAL: Asset,
    SINISTRAL: Asset,
    SURFACE_1: Asset,
    SURFACE_2: Asset,

    DIRECTION_ONE_BLUE: Asset,
    DIRECTION_TWO_BLUE: Asset,
    DEXTRAL_BLUE: Asset,
    SINISTRAL_BLUE: Asset,
    SURFACE_1_BLUE: Asset,
    SURFACE_2_BLUE: Asset,

    DIRECTION_ONE_GREEN: Asset,
    DIRECTION_TWO_GREEN: Asset,
    DEXTRAL_GREEN: Asset,
    SINISTRAL_GREEN: Asset,
    SURFACE_1_GREEN: Asset,
    SURFACE_2_GREEN: Asset,

    DIRECTION_ONE_PURPLE: Asset,
    DIRECTION_TWO_PURPLE: Asset,
    DEXTRAL_PURPLE: Asset,
    SINISTRAL_PURPLE: Asset,
    SURFACE_1_PURPLE: Asset,
    SURFACE_2_PURPLE: Asset,

    DIRECTION_ONE_RED: Asset,
    DIRECTION_TWO_RED: Asset,
    DEXTRAL_RED: Asset,
    SINISTRAL_RED: Asset,
    SURFACE_1_RED: Asset,
    SURFACE_2_RED: Asset,

    DIRECTION_ONE_YELLOW: Asset,
    DIRECTION_TWO_YELLOW: Asset,
    DEXTRAL_YELLOW: Asset,
    SINISTRAL_YELLOW: Asset,
    SURFACE_1_YELLOW: Asset,
    SURFACE_2_YELLOW: Asset,
  }
  private static TUTORIAL: {
    TUTORIAL_BUBBLE_LEVEL_SURFACE_ANGLE: Asset,
    TUTORIAL_BUBBLE_LEVEL_BASE_ROTATION: Asset,
  }

  static async loadAssetsAsync() {

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

    // MARKERS MAP
    const satelliteInput        = Asset.fromModule(require('@Assets/marker_satellite_input.png'));
    const infoSample            = Asset.fromModule(require('@Assets/marker_info_sample.png'));
    const infoProject           = Asset.fromModule(require('@Assets/marker_info_project.png'));
    const userLastKnownLocation = Asset.fromModule(require('@Assets/marker_user_last_known_location.png'));

    // MARKERS MEASUREMENTS
    const marker_direction_one  = Asset.fromModule(require('@Assets/marker_direction_one.png'));
    const marker_direction_two  = Asset.fromModule(require('@Assets/marker_direction_two.png'));
    const marker_dextral        = Asset.fromModule(require('@Assets/marker_dextral.png'));
    const marker_sinistral      = Asset.fromModule(require('@Assets/marker_sinistral.png'));
    const marker_surface_1      = Asset.fromModule(require('@Assets/marker_surface_1.png'));
    const marker_surface_2      = Asset.fromModule(require('@Assets/marker_surface_2.png'));

    // MARKERS MEASUREMENTS - BLUE
    const marker_direction_one_blue  = Asset.fromModule(require('@Assets/marker_direction_one_blue.png'));
    const marker_direction_two_blue  = Asset.fromModule(require('@Assets/marker_direction_two_blue.png'));
    const marker_dextral_blue        = Asset.fromModule(require('@Assets/marker_dextral_blue.png'));
    const marker_sinistral_blue      = Asset.fromModule(require('@Assets/marker_sinistral_blue.png'));
    const marker_surface_1_blue      = Asset.fromModule(require('@Assets/marker_surface_1_blue.png'));
    const marker_surface_2_blue      = Asset.fromModule(require('@Assets/marker_surface_2_blue.png'));
    
    // MARKERS MEASUREMENTS - GREEN
    const marker_direction_one_green  = Asset.fromModule(require('@Assets/marker_direction_one_green.png'));
    const marker_direction_two_green  = Asset.fromModule(require('@Assets/marker_direction_two_green.png'));
    const marker_dextral_green        = Asset.fromModule(require('@Assets/marker_dextral_green.png'));
    const marker_sinistral_green      = Asset.fromModule(require('@Assets/marker_sinistral_green.png'));
    const marker_surface_1_green      = Asset.fromModule(require('@Assets/marker_surface_1_green.png'));
    const marker_surface_2_green      = Asset.fromModule(require('@Assets/marker_surface_2_green.png'));

    // MARKERS MEASUREMENTS - PURPLE
    const marker_direction_one_purple  = Asset.fromModule(require('@Assets/marker_direction_one_purple.png'));
    const marker_direction_two_purple  = Asset.fromModule(require('@Assets/marker_direction_two_purple.png'));
    const marker_dextral_purple        = Asset.fromModule(require('@Assets/marker_dextral_purple.png'));
    const marker_sinistral_purple      = Asset.fromModule(require('@Assets/marker_sinistral_purple.png'));
    const marker_surface_1_purple      = Asset.fromModule(require('@Assets/marker_surface_1_purple.png'));
    const marker_surface_2_purple      = Asset.fromModule(require('@Assets/marker_surface_2_purple.png'));

    // MARKERS MEASUREMENTS - RED
    const marker_direction_one_red  = Asset.fromModule(require('@Assets/marker_direction_one_red.png'));
    const marker_direction_two_red  = Asset.fromModule(require('@Assets/marker_direction_two_red.png'));
    const marker_dextral_red        = Asset.fromModule(require('@Assets/marker_dextral_red.png'));
    const marker_sinistral_red      = Asset.fromModule(require('@Assets/marker_sinistral_red.png'));
    const marker_surface_1_red      = Asset.fromModule(require('@Assets/marker_surface_1_red.png'));
    const marker_surface_2_red      = Asset.fromModule(require('@Assets/marker_surface_2_red.png'));

    // MARKERS MEASUREMENTS - YELLOW
    const marker_direction_one_yellow  = Asset.fromModule(require('@Assets/marker_direction_one_yellow.png'));
    const marker_direction_two_yellow  = Asset.fromModule(require('@Assets/marker_direction_two_yellow.png'));
    const marker_dextral_yellow        = Asset.fromModule(require('@Assets/marker_dextral_yellow.png'));
    const marker_sinistral_yellow      = Asset.fromModule(require('@Assets/marker_sinistral_yellow.png'));
    const marker_surface_1_yellow      = Asset.fromModule(require('@Assets/marker_surface_1_yellow.png'));
    const marker_surface_2_yellow      = Asset.fromModule(require('@Assets/marker_surface_2_yellow.png'));

    this.MARKERS = {

      // MAP
      SATELLITE_INPUT:          await satelliteInput.downloadAsync(),
      INFO_SAMPLE:              await infoSample.downloadAsync(),
      INFO_PROJECT:             await infoProject.downloadAsync(),
      USER_LAST_KNOWN_LOCATION: await userLastKnownLocation.downloadAsync(),

      // MEASUREMENTS
      DIRECTION_ONE:            await marker_direction_one.downloadAsync(),
      DIRECTION_TWO:            await marker_direction_two.downloadAsync(),
      DEXTRAL:                  await marker_dextral.downloadAsync(),
      SINISTRAL:                await marker_sinistral.downloadAsync(),
      SURFACE_1:                await marker_surface_1.downloadAsync(),
      SURFACE_2:                await marker_surface_2.downloadAsync(),

      DIRECTION_ONE_BLUE:       await marker_direction_one_blue.downloadAsync(),
      DIRECTION_TWO_BLUE:       await marker_direction_two_blue.downloadAsync(),
      DEXTRAL_BLUE:             await marker_dextral_blue.downloadAsync(),
      SINISTRAL_BLUE:           await marker_sinistral_blue.downloadAsync(),
      SURFACE_1_BLUE:           await marker_surface_1_blue.downloadAsync(),
      SURFACE_2_BLUE:           await marker_surface_2_blue.downloadAsync(),

      DIRECTION_ONE_GREEN:      await marker_direction_one_green.downloadAsync(),
      DIRECTION_TWO_GREEN:      await marker_direction_two_green.downloadAsync(),
      DEXTRAL_GREEN:            await marker_dextral_green.downloadAsync(),
      SINISTRAL_GREEN:          await marker_sinistral_green.downloadAsync(),
      SURFACE_1_GREEN:          await marker_surface_1_green.downloadAsync(),
      SURFACE_2_GREEN:          await marker_surface_2_green.downloadAsync(),

      DIRECTION_ONE_PURPLE:     await marker_direction_one_purple.downloadAsync(),
      DIRECTION_TWO_PURPLE:     await marker_direction_two_purple.downloadAsync(),
      DEXTRAL_PURPLE:           await marker_dextral_purple.downloadAsync(),
      SINISTRAL_PURPLE:         await marker_sinistral_purple.downloadAsync(),
      SURFACE_1_PURPLE:         await marker_surface_1_purple.downloadAsync(),
      SURFACE_2_PURPLE:         await marker_surface_2_purple.downloadAsync(),

      DIRECTION_ONE_RED:        await marker_direction_one_red.downloadAsync(),
      DIRECTION_TWO_RED:        await marker_direction_two_red.downloadAsync(),
      DEXTRAL_RED:              await marker_dextral_red.downloadAsync(),
      SINISTRAL_RED:            await marker_sinistral_red.downloadAsync(),
      SURFACE_1_RED:            await marker_surface_1_red.downloadAsync(),
      SURFACE_2_RED:            await marker_surface_2_red.downloadAsync(),

      DIRECTION_ONE_YELLOW:     await marker_direction_one_yellow.downloadAsync(),
      DIRECTION_TWO_YELLOW:     await marker_direction_two_yellow.downloadAsync(),
      DEXTRAL_YELLOW:           await marker_dextral_yellow.downloadAsync(),
      SINISTRAL_YELLOW:         await marker_sinistral_yellow.downloadAsync(),
      SURFACE_1_YELLOW:         await marker_surface_1_yellow.downloadAsync(),
      SURFACE_2_YELLOW:         await marker_surface_2_yellow.downloadAsync(),
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

      // MAP
      case 'SATELLITE_INPUT':          return AssetManager.MARKERS.SATELLITE_INPUT.localUri as string;
      case 'INFO_SAMPLE':              return AssetManager.MARKERS.INFO_SAMPLE.localUri as string;
      case 'INFO_PROJECT':             return AssetManager.MARKERS.INFO_PROJECT.localUri as string;
      case 'USER_LAST_KNOWN_LOCATION': return AssetManager.MARKERS.USER_LAST_KNOWN_LOCATION.localUri as string;

      // MEASUREMENTS
      case 'DIRECTION_ONE':            return AssetManager.MARKERS.DIRECTION_ONE.localUri as string;
      case 'DIRECTION_TWO':            return AssetManager.MARKERS.DIRECTION_TWO.localUri as string;
      case 'DEXTRAL':                  return AssetManager.MARKERS.DEXTRAL.localUri as string;
      case 'SINISTRAL':                return AssetManager.MARKERS.SINISTRAL.localUri as string;
      case 'SURFACE_1':                return AssetManager.MARKERS.SURFACE_1.localUri as string;
      case 'SURFACE_2':                return AssetManager.MARKERS.SURFACE_2.localUri as string;

      case 'DIRECTION_ONE_BLUE':       return AssetManager.MARKERS.DIRECTION_ONE_BLUE.localUri as string;
      case 'DIRECTION_TWO_BLUE':       return AssetManager.MARKERS.DIRECTION_TWO_BLUE.localUri as string;
      case 'DEXTRAL_BLUE':             return AssetManager.MARKERS.DEXTRAL_BLUE.localUri as string;
      case 'SINISTRAL_BLUE':           return AssetManager.MARKERS.SINISTRAL_BLUE.localUri as string;
      case 'SURFACE_1_BLUE':           return AssetManager.MARKERS.SURFACE_1_BLUE.localUri as string;
      case 'SURFACE_2_BLUE':           return AssetManager.MARKERS.SURFACE_2_BLUE.localUri as string;

      case 'DIRECTION_ONE_GREEN':      return AssetManager.MARKERS.DIRECTION_ONE_GREEN.localUri as string;
      case 'DIRECTION_TWO_GREEN':      return AssetManager.MARKERS.DIRECTION_TWO_GREEN.localUri as string;
      case 'DEXTRAL_GREEN':            return AssetManager.MARKERS.DEXTRAL_GREEN.localUri as string;
      case 'SINISTRAL_GREEN':          return AssetManager.MARKERS.SINISTRAL_GREEN.localUri as string;
      case 'SURFACE_1_GREEN':          return AssetManager.MARKERS.SURFACE_1_GREEN.localUri as string;
      case 'SURFACE_2_GREEN':          return AssetManager.MARKERS.SURFACE_2_GREEN.localUri as string;

      case 'DIRECTION_ONE_PURPLE':     return AssetManager.MARKERS.DIRECTION_ONE_PURPLE.localUri as string;
      case 'DIRECTION_TWO_PURPLE':     return AssetManager.MARKERS.DIRECTION_TWO_PURPLE.localUri as string;
      case 'DEXTRAL_PURPLE':           return AssetManager.MARKERS.DEXTRAL_PURPLE.localUri as string;
      case 'SINISTRAL_PURPLE':         return AssetManager.MARKERS.SINISTRAL_PURPLE.localUri as string;
      case 'SURFACE_1_PURPLE':         return AssetManager.MARKERS.SURFACE_1_PURPLE.localUri as string;
      case 'SURFACE_2_PURPLE':         return AssetManager.MARKERS.SURFACE_2_PURPLE.localUri as string;

      case 'DIRECTION_ONE_RED':        return AssetManager.MARKERS.DIRECTION_ONE_RED.localUri as string;
      case 'DIRECTION_TWO_RED':        return AssetManager.MARKERS.DIRECTION_TWO_RED.localUri as string;
      case 'DEXTRAL_RED':              return AssetManager.MARKERS.DEXTRAL_RED.localUri as string;
      case 'SINISTRAL_RED':            return AssetManager.MARKERS.SINISTRAL_RED.localUri as string;
      case 'SURFACE_1_RED':            return AssetManager.MARKERS.SURFACE_1_RED.localUri as string;
      case 'SURFACE_2_RED':            return AssetManager.MARKERS.SURFACE_2_RED.localUri as string;

      case 'DIRECTION_ONE_YELLOW':     return AssetManager.MARKERS.DIRECTION_ONE_YELLOW.localUri as string;
      case 'DIRECTION_TWO_YELLOW':     return AssetManager.MARKERS.DIRECTION_TWO_YELLOW.localUri as string;
      case 'DEXTRAL_YELLOW':           return AssetManager.MARKERS.DEXTRAL_YELLOW.localUri as string;
      case 'SINISTRAL_YELLOW':         return AssetManager.MARKERS.SINISTRAL_YELLOW.localUri as string;
      case 'SURFACE_1_YELLOW':         return AssetManager.MARKERS.SURFACE_1_YELLOW.localUri as string;
      case 'SURFACE_2_YELLOW':         return AssetManager.MARKERS.SURFACE_2_YELLOW.localUri as string;
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