import { Dispatch, SetStateAction } from "react";
import { MapScope, MarkerData } from "@V2/Types/AppTypes";

export class MapAPI {

  private static scopeSetter:        Dispatch<SetStateAction<MapScope>> | null     = null;
  private static markersDataSetter:  Dispatch<SetStateAction<MarkerData[]>> | null = null;
  private static tutorialModeSetter: Dispatch<SetStateAction<boolean>> | null      = null;

  static registerScopeSetter(setter: Dispatch<SetStateAction<MapScope>>)           { this.scopeSetter = setter;        }
  static registerMarkersDataSetter(setter: Dispatch<SetStateAction<MarkerData[]>>) { this.markersDataSetter = setter;  }
  static registerTutorialModeSetter(setter: Dispatch<SetStateAction<boolean>>)     { this.tutorialModeSetter = setter; }

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
}