import { Dispatch, SetStateAction, useEffect } from "react";
import { SubscriptionManager } from "@SubscriptionManager";
import { MapScope } from "@V2/Types/AppTypes";
import { ControllerAPI } from "@V2/Scopes/API/Controller";
import { CompassMeasurementDTO, CoordinateDTO } from "@V2/Types/ProjectTypes";

export function useMap_SetMarker(o: {
  openMap: boolean,
  measurement: CompassMeasurementDTO | null,
  onRegionChangeCallback: (region: CoordinateDTO | undefined) => void,
  onCloseMap: () => void,
}) {
  const { openMap, measurement } = o;
  useEffect(() => {
    if (o.openMap) {
      MapAPI.registerOnRegionChangeCallback(o.onRegionChangeCallback);
      MapAPI.registerOnCloseMapCallback(o.onCloseMap);
      MapAPI.configOpenMeasurement(measurement);
      MapAPI.toggleMap(true);
      MapAPI.showPinUI_Measurement(true);
    }
  }, [openMap]);
}

type ShowSetter = {
  map: boolean;
  indicator: boolean;
  tutorial: boolean;
  pinUI_Measurement: boolean;
  defaultUI: boolean;
}

export class MapAPI {

  static isMapOpen: boolean = false;

  private static scopeSetter:                 Dispatch<SetStateAction<MapScope>> | null                     = null;
  private static tutorialModeSetter:          Dispatch<SetStateAction<boolean>> | null                      = null;
  private static backupCoordinateSetter:      Dispatch<SetStateAction<CoordinateDTO | undefined>> | null    = null;
  private static openMeasurementSetter:       Dispatch<SetStateAction<CompassMeasurementDTO | null>> | null = null;
  private static didMeasurementChangedSetter: Dispatch<SetStateAction<boolean>> | null                 = null;
  private static showSetter:                  Dispatch<SetStateAction<ShowSetter>> | null                   = null;

  private static onRegionChangeCallback: ((region: CoordinateDTO | undefined) => void) | null = null;
  private static onCloseMapCallback:     (() => void) | null                                          = null;

  /* Setters from Map Layer */
  static registerScopeSetter(setter: Dispatch<SetStateAction<MapScope>>)                               { this.scopeSetter = setter;            }
  static registerTutorialModeSetter(setter: Dispatch<SetStateAction<boolean>>)                         { this.tutorialModeSetter = setter;     }
  static registerBackupCoordinateSetter(setter: Dispatch<SetStateAction<CoordinateDTO | undefined>>)   { this.backupCoordinateSetter = setter; }
  static registerOpenMeasurementSetter(setter: Dispatch<SetStateAction<CompassMeasurementDTO | null>>) { this.openMeasurementSetter = setter;  }
  static registerDidMeasurementChangedSetter(setter: Dispatch<SetStateAction<boolean>>)                { this.didMeasurementChangedSetter = setter; }
  static registerShowSetter(setter: Dispatch<SetStateAction<ShowSetter>>)                              { this.showSetter = setter;             }

  /* Callbacks from App Layer */
  static registerOnRegionChangeCallback(callback: (region: CoordinateDTO | undefined) => void) { this.onRegionChangeCallback = callback; }
  static registerOnCloseMapCallback(callback: () => void)                                              { this.onCloseMapCallback = callback;     }

  // Manipulation Methods ------------------------------------------------------------

  static changeScope(newScope: MapScope) {
    if (this.scopeSetter !== null) {
      this.scopeSetter(newScope);
    }
  }

  static toggleTutorialMode() {
    if (this.tutorialModeSetter !== null) {
      this.tutorialModeSetter(prev => !prev);
    }
  }

  static toggleMap(visible?: boolean) {

    if (!SubscriptionManager.getStatus().isMapEnabled) {
      ControllerAPI.changeScope({ scope: 'SUBSCRIPTIONS SCOPE' })
      return;
    }

    if (this.showSetter) {

      const newValue = visible ?? !this.isMapOpen;
      this.showSetter(prev => ({ ...prev, map: newValue }) );
      this.isMapOpen = newValue;

      if (!newValue && this.onCloseMapCallback) {
        // Close map actions
        this.showSetter(prev => ({ ...prev,
          pinUI_Measurement: false,
          defaultUI: true
        }));
        this.onCloseMapCallback();
        this.onCloseMapCallback = null;
        this.onRegionChangeCallback = null;
        this.configOpenMeasurement(null);
      }
    }
  }

  static triggerRegionUpdate(region: CoordinateDTO | undefined) {
    if (this.onRegionChangeCallback) {
      this.onRegionChangeCallback(region);
    }
  }

  static showPinUI_Measurement(show: boolean) {
    if (
      this.showSetter &&
      this.didMeasurementChangedSetter
    ) {
      this.didMeasurementChangedSetter(false);
      this.showSetter(prev => ({ ...prev,
        pinUI_Measurement: show,
        defaultUI: !show,
      }));
    }
  }

  static configOpenMeasurement(measurement: CompassMeasurementDTO | null) {
    if (
      this.openMeasurementSetter &&
      this.backupCoordinateSetter
    ) {
      this.openMeasurementSetter(measurement);
      this.backupCoordinateSetter(measurement ? measurement.coordinates : undefined);
    }
  }
}