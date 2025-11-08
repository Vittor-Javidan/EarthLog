import { Dispatch, SetStateAction } from "react";

export const googleMapsPinColor = [
  'red', 'blue', 'green', 'orange', 'yellow', 'aqua', 'purple'
] as const;

export type GoogleMapsPinColor = (typeof googleMapsPinColor)[number];

export type ProjectMapScope = {
  type: "project";
  id_project: string;
};

export type SampleMapScope = {
  type: "sample";
  id_project: string;
  id_sample: string;
};

export type MapScope = {
  type: 'navigation' | 'gpsAcquisition'
} | ProjectMapScope | SampleMapScope;

export type MarkerData = {
  title: string
  id_marker: string
  pinColor: GoogleMapsPinColor
  coordinates: {
    latitude: number,
    longitude: number,
    accuracy: number,
  }
}

export class MapAPI {
  static registerMapVisibilitySetter(setShowMap: Dispatch<SetStateAction<boolean>>) {
    throw new Error("Method not implemented.");
  }

  private static scopeSetter: React.Dispatch<React.SetStateAction<MapScope>> | null = null;
  private static markersDataSetter: React.Dispatch<React.SetStateAction<MarkerData[]>> | null = null;
  private static markerRefresherSetter: React.Dispatch<React.SetStateAction<boolean>> | null = null;

  static registerScopeSetter(setter: React.Dispatch<React.SetStateAction<MapScope>>) {
    this.scopeSetter = setter;
  }

  static registerMarkersDataSetter(setter: React.Dispatch<React.SetStateAction<MarkerData[]>>) {
    this.markersDataSetter = setter;
  }

  static registerMarkerRefresherSetter(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    this.markerRefresherSetter = setter;
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