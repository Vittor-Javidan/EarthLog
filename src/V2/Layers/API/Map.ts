import { Dispatch, SetStateAction, useEffect } from "react";
import { SubscriptionManager } from "@SubscriptionManager";
import { MapMarkerFilter, MapScope, MapShowSetter } from "@V2/Types/AppTypes";
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
      MapAPI.onRegionChangeCallback = o.onRegionChangeCallback;
      MapAPI.onCloseMapCallback     = o.onCloseMap;
      MapAPI.configOpenMeasurement(measurement);
      MapAPI.toggleMap(true);
      MapAPI.showPinUI_Measurement(true);
    }
  }, [openMap]);
}

export class MapAPI {

  static isMapOpen: boolean = false;

  /* Setters from Map Layer */
  static scopeSetter:                 Dispatch<SetStateAction<MapScope>> | null                     = null;
  static tutorialModeSetter:          Dispatch<SetStateAction<boolean>> | null                      = null;
  static markerFilterSetter:          Dispatch<SetStateAction<MapMarkerFilter>> | null              = null;
  static showSetter:                  Dispatch<SetStateAction<MapShowSetter>> | null                = null;
  static backupCoordinateSetter:      Dispatch<SetStateAction<CoordinateDTO | undefined>> | null    = null;
  static openMeasurementSetter:       Dispatch<SetStateAction<CompassMeasurementDTO | null>> | null = null;
  static didMeasurementChangedSetter: Dispatch<SetStateAction<boolean>> | null                      = null;

  /* Callbacks from App Layer */
  static onRegionChangeCallback: ((region: CoordinateDTO | undefined) => void) | null = null;
  static onCloseMapCallback:     (() => void) | null                                  = null;

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
      SubscriptionManager.getStatus().isMapEnabled &&
      this.markerFilterSetter &&
      this.showSetter &&
      this.didMeasurementChangedSetter
    ) {
      this.didMeasurementChangedSetter(false);
      this.markerFilterSetter(prev => ({ ...prev,
        projectInfo: true,
        sampleInfo: true,
        gpsInput: true,
        compassMeasurement: true,
      }));
      this.showSetter(prev => ({ ...prev,
        pinUI_Measurement: show,
        defaultUI: !show,
      }));
    }
  }

  static configOpenMeasurement(measurement: CompassMeasurementDTO | null) {
    if (
      SubscriptionManager.getStatus().isMapEnabled &&
      this.openMeasurementSetter &&
      this.backupCoordinateSetter
    ) {
      this.openMeasurementSetter(measurement);
      this.backupCoordinateSetter(measurement ? measurement.coordinates : undefined);
    }
  }
}