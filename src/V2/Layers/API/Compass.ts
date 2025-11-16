import { Dispatch, SetStateAction, useEffect } from "react";
import { CompassLayerConfig } from "@V2/Types/AppTypes";
import { CompassInputData } from "@V2/Types/ProjectTypes";

export function useCompassLayer(
  o: {
    config: CompassLayerConfig,
    onMeasurementTake: (heading: number, dip: number) => void,
    onCompassClose: () => void,
  },
  deps: [openCompass: boolean, inputData: CompassInputData | undefined]
) {
  const [openCompass, inputData] = deps;
  useEffect(() => {
    CompassAPI.configCompass(o.config);
    CompassAPI.onMeasurementTakeCallback(o.onMeasurementTake);
    CompassAPI.onCompassCloseCallback(o.onCompassClose);
    if (openCompass) {
      CompassAPI.openCompass();
    }
  }, [openCompass, inputData]);
}

export class CompassAPI {

  private static showCompassSetter:  Dispatch<SetStateAction<boolean>> | null                    = null;
  private static compassConfigSetter: Dispatch<SetStateAction<CompassLayerConfig | null>> | null = null;
  private static onMeasurementTake: ((heading: number, dip: number) => void) | null              = null;
  private static onCompassClose: (() => void) | null                                             = null;

  /* Setters from Compass Layer */
  static registerShowCompassSetter(setter: Dispatch<SetStateAction<boolean>>)                     { this.showCompassSetter   = setter   }
  static registerCompassConfigSetter(setter: Dispatch<SetStateAction<CompassLayerConfig | null>>) { this.compassConfigSetter = setter   }

  /* Callbacks from App Layer */
  static onMeasurementTakeCallback(callback: (heading: number, dip: number) => void) { this.onMeasurementTake = callback }
  static onCompassCloseCallback(callback: () => void) { this.onCompassClose = callback }

  // Manipulation Methods ------------------------------------------------------------

  private static toggleCompass(boolean?: boolean) {
    if (this.showCompassSetter !== null) {
      this.showCompassSetter((prev) =>  boolean ?? !prev);
    }
  }

  static configCompass(config: CompassLayerConfig) {
    if (this.compassConfigSetter !== null) {
      this.compassConfigSetter(config);
    }
  }

  static triggerOnMeasurementTake(heading: number, dip: number) {
    if (this.onMeasurementTake !== null) {
      this.onMeasurementTake(heading, dip);
    }
  }

  static openCompass() {
    this.toggleCompass(true);
  }

  static closeCompass() {
    this.toggleCompass(false);
    if (this.onCompassClose !== null) {
      this.onCompassClose();
      this.onCompassClose = null;
      this.onMeasurementTake = null;
    }
  }
}