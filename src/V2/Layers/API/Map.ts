import { Dispatch, SetStateAction, useEffect } from "react";

import {
  CompassMeasurementDTO,
  CoordinateDTO,
  GPSInputData,
  GPSSource,
  MapFilter,
  MapScope,
  MapShowSetter,
  OpenEntity
} from "@V2/Types";

import { SubscriptionManager } from "@SubscriptionManager";
import { ControllerAPI } from "@V2/Scopes/API/Controller";

export function useMap_SetMarker_Measurement(o: {
  openMap: boolean,
  measurement: CompassMeasurementDTO | null,
  onRegionChangeCallback: (region: CoordinateDTO | undefined) => void,
  onCloseMap: () => void,
}) {
  const { openMap, measurement } = o;
  useEffect(() => {
    if (o.openMap) {
      PinMeasurementUI_API.onRegionChangeCallback = o.onRegionChangeCallback;
      PinMeasurementUI_API.onCloseMapCallback     = o.onCloseMap;
      PinMeasurementUI_API.configOpenMeasurement(measurement);
      MapAPI.showPinMeasurementUI();
      MapAPI.toggleMap(true);
    }
  }, [openMap]);
}

export function useMap_SetMarker_GPS(o: {
  openMap: boolean,
  gps: GPSInputData | null,
  source: GPSSource | null,
  onRegionChangeCallback: (region: CoordinateDTO | undefined) => void,
  onCloseMap: () => void,
}) {
  const { openMap, gps, source } = o;
  useEffect(() => {
    if (o.openMap) {
      PinGPS_API.onRegionChangeCallback = o.onRegionChangeCallback;
      PinGPS_API.onCloseMapCallback     = o.onCloseMap;
      PinGPS_API.configOpenGPS(gps, source);
      MapAPI.showPinGPSUI();
      MapAPI.toggleMap(true);
    }
  }, [openMap, gps, source]);
}

export class MapAPI {

  static isMapOpen: boolean = false;

  static scopeSetter:        Dispatch<SetStateAction<MapScope>> | null          = null;
  static tutorialModeSetter: Dispatch<SetStateAction<boolean>> | null           = null;
  static openEntitySetter:   Dispatch<SetStateAction<OpenEntity | null>> | null = null;
  static filterSetter:       Dispatch<SetStateAction<MapFilter>> | null         = null;
  static showSetter:         Dispatch<SetStateAction<MapShowSetter>> | null     = null;

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

      if (
        !newValue &&
        this.openEntitySetter
      ) {
        this.openEntitySetter(null);
        this.showSetter(prev => ({ ...prev,
          ui_PinMeasurement: false,
          ui_Default: true
        }));
        PinMeasurementUI_API.closeMap();
        PinGPS_API.closeMap();
      }
    }
  }

  static showPinMeasurementUI() {

    if (!SubscriptionManager.getStatus().isMapEnabled) {
      ControllerAPI.changeScope({ scope: 'SUBSCRIPTIONS SCOPE' })
      return;
    }

    if (
      this.filterSetter &&
      this.showSetter &&
      PinMeasurementUI_API.didMeasurementChangedSetter
    ) {
      PinMeasurementUI_API.didMeasurementChangedSetter(false);
      this.filterSetter(prev => ({ ...prev,
        projectInfo: true,
        sampleInfo: true,
        gpsInput: true,
        compassMeasurement: true,
      }));
      this.showSetter(prev => ({ ...prev,
        ui_PinMeasurement: true,
        ui_Default: false,
        ui_PinGPS: false,
      }));
    }
  }

  static showPinGPSUI() {

    if (!SubscriptionManager.getStatus().isMapEnabled) {
      ControllerAPI.changeScope({ scope: 'SUBSCRIPTIONS SCOPE' })
      return;
    }

    if (
      this.filterSetter &&
      this.showSetter &&
      PinGPS_API.didGPSChangedSetter
    ) {
      PinGPS_API.didGPSChangedSetter(false);
      this.filterSetter(prev => ({ ...prev,
        projectInfo: true,
        sampleInfo: true,
        gpsInput: true,
        compassMeasurement: true,
      }));
      this.showSetter(prev => ({ ...prev,
        ui_PinMeasurement: false,
        ui_Default: false,
        ui_PinGPS: true,
      }));
    }
  }
}

export class PinMeasurementUI_API {

  static backupCoordinateSetter:      Dispatch<SetStateAction<CoordinateDTO | undefined>> | null    = null;
  static openMeasurementSetter:       Dispatch<SetStateAction<CompassMeasurementDTO | null>> | null = null;
  static didMeasurementChangedSetter: Dispatch<SetStateAction<boolean>> | null                      = null;

  static onRegionChangeCallback: ((region: CoordinateDTO | undefined) => void) | null = null;
  static onCloseMapCallback:     (() => void) | null                                  = null;

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

  static triggerRegionUpdate(region: CoordinateDTO | undefined) {
    if (this.onRegionChangeCallback) {
      this.onRegionChangeCallback(region);
    }
  }

  static closeMap() {
    if (this.onCloseMapCallback) {
      this.onCloseMapCallback();
      this.onCloseMapCallback = null;
      this.onRegionChangeCallback = null;
      this.configOpenMeasurement(null);
    }
  }
}

export class PinGPS_API {

  static backupCoordinateSetter: Dispatch<SetStateAction<CoordinateDTO | undefined>> | null = null;
  static openGPSSetter:          Dispatch<SetStateAction<GPSInputData | null>> | null       = null;
  static gpsSourceSetter:        Dispatch<SetStateAction<GPSSource | null>> | null          = null;
  static didGPSChangedSetter:    Dispatch<SetStateAction<boolean>> | null                   = null;

  static onRegionChangeCallback: ((region: CoordinateDTO | undefined) => void) | null = null;
  static onCloseMapCallback:     (() => void) | null                                  = null;

  static configOpenGPS(gps: GPSInputData | null, source: GPSSource | null) {
    if (
      SubscriptionManager.getStatus().isMapEnabled &&
      this.openGPSSetter &&
      this.gpsSourceSetter &&
      this.backupCoordinateSetter
    ) {
      this.openGPSSetter(gps);
      this.gpsSourceSetter(source);
      this.backupCoordinateSetter(gps ? gps.value?.coordinates : undefined);
    }
  }

  static triggerRegionUpdate(region: CoordinateDTO | undefined) {
    if (this.onRegionChangeCallback) {
      this.onRegionChangeCallback(region);
    }
  }

  static closeMap() {
    if (this.onCloseMapCallback) {
      this.onCloseMapCallback();
      this.onCloseMapCallback = null;
      this.onRegionChangeCallback = null;
      this.configOpenGPS(null, null);
    }
  }

}