import { Dispatch, SetStateAction, useEffect } from "react";

export function useLayerButtons(deps: [openLayer: boolean]) {
  const [openLayer] = deps;
  useEffect(() => {
    openLayer
    ? LayerButtonsAPI.openLayer()
    : LayerButtonsAPI.closeLayer();
  }, [openLayer]);
}

export class LayerButtonsAPI {

  private static showLayerSetter:  Dispatch<SetStateAction<boolean>> | null = null;

  /* Setters from Map_MarkerSelection Layer */
  static registerShowLayerSetter(setter: Dispatch<SetStateAction<boolean>>) { this.showLayerSetter = setter }

  // Manipulation Methods ------------------------------------------------------------
  private static toggleLayer(boolean?: boolean) {
    if (this.showLayerSetter !== null) {
      this.showLayerSetter((prev) =>  boolean ?? !prev);
    }
  }

  static openLayer() {
    this.toggleLayer(true);
  }

  static closeLayer() {
    this.toggleLayer(false);
  }
}