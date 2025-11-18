import { Dispatch, SetStateAction } from "react";
import { MapScope, MarkerData } from "@V1/Types/AppTypes";

export class MapAPI {

  static isMapOpen: boolean = false;

  private static scopeSetter:           Dispatch<SetStateAction<MapScope>> | null     = null;
  private static markersDataSetter:     Dispatch<SetStateAction<MarkerData[]>> | null = null;
  private static tutorialModeSetter:    Dispatch<SetStateAction<boolean>> | null      = null;
  private static toggleShowMapCallback: (() => void) | null                           = null;

  static registerScopeSetter(setter: Dispatch<SetStateAction<MapScope>>)           { this.scopeSetter = setter;        }
  static registerMarkersDataSetter(setter: Dispatch<SetStateAction<MarkerData[]>>) { this.markersDataSetter = setter;  }
  static registerTutorialModeSetter(setter: Dispatch<SetStateAction<boolean>>)     { this.tutorialModeSetter = setter; }
  static registerToggleMapCallback(callback: () => void)                           { this.toggleShowMapCallback = callback; }

  static changeScope(newScope: MapScope) {
    if (
      this.scopeSetter !== null &&
      this.markersDataSetter !== null
    ) {
      if (newScope.type === 'navigation') {
        this.markersDataSetter([]);
      }
      this.scopeSetter(newScope);
    }
  }

  static toggleTutorialMode() {
    if (this.tutorialModeSetter !== null) {
      this.tutorialModeSetter(prev => !prev);
    }
  }

  static toggleMap() {
    if (this.toggleShowMapCallback !== null) {
      this.toggleShowMapCallback();
      this.isMapOpen = !this.isMapOpen;
    }
  }
}