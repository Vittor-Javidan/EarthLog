import { Dispatch, SetStateAction } from "react";
import { MapScope, MarkerData } from "@V2/Types/AppTypes";

export class MapAPI {
  static registerMapVisibilitySetter(setShowMap: Dispatch<SetStateAction<boolean>>) {
    throw new Error("Method not implemented.");
  }

  private static scopeSetter: React.Dispatch<React.SetStateAction<MapScope>> | null = null;
  private static markersDataSetter: React.Dispatch<React.SetStateAction<MarkerData[]>> | null = null;

  static registerScopeSetter(setter: React.Dispatch<React.SetStateAction<MapScope>>) {
    this.scopeSetter = setter;
  }

  static registerMarkersDataSetter(setter: React.Dispatch<React.SetStateAction<MarkerData[]>>) {
    this.markersDataSetter = setter;
  }

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
}