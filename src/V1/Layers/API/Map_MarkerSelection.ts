import { MarkerAssets } from "@AssetManager";
import { Dispatch, SetStateAction, useEffect } from "react";

export function useMap_MarkerSelectionLayer(
  o: {
    onMarkerSelect: (markerName: MarkerAssets) => void,
    onLayerClose: () => void,
  },
  deps: [openLayer: boolean, markerIcon: MarkerAssets, heading: number]
) {
  const [openLayer, markerIcon, heading] = deps;
  useEffect(() => {
    Map_MarkerSelectionAPI.heading = heading;
    Map_MarkerSelectionAPI.onMarkerSelectCallback(o.onMarkerSelect);
    Map_MarkerSelectionAPI.onLayerCloseCallback(o.onLayerClose);
    if (openLayer) {
      Map_MarkerSelectionAPI.openLayer();
    }
  }, [openLayer, markerIcon]);
}

export class Map_MarkerSelectionAPI {
  private static showLayerSetter:  Dispatch<SetStateAction<boolean>> | null = null;
  private static onMarkerSelect: ((markerName: MarkerAssets) => void) | null = null;
  private static onLayerClose: (() => void) | null = null;
  static heading: number = 0;

  /* Setters from Map_MarkerSelection Layer */
  static registerShowLayerSetter(setter: Dispatch<SetStateAction<boolean>>) { this.showLayerSetter = setter }

  /* Callbacks from App Layer */
  static onMarkerSelectCallback(callback: (markerName: MarkerAssets) => void) { this.onMarkerSelect = callback }
  static onLayerCloseCallback(callback: () => void) { this.onLayerClose = callback }

  // Manipulation Methods ------------------------------------------------------------
  private static toggleLayer(boolean?: boolean) {
    if (this.showLayerSetter !== null) {
      this.showLayerSetter((prev) =>  boolean ?? !prev);
    }
  }

  static triggerOnMarkerSelect(markerName: MarkerAssets) {
    if (this.onMarkerSelect !== null) {
      this.onMarkerSelect(markerName);
    }
  }

  static openLayer() {
    this.toggleLayer(true);
  }

  static closeLayer() {
    this.toggleLayer(false);
    if (this.onLayerClose !== null) {
      this.onLayerClose();
      this.onLayerClose = null;
      this.onMarkerSelect = null;
    }
  }
}