import { Dispatch, SetStateAction, useEffect } from "react";
import { TutorialType } from "@V2/Types/AppTypes";

export function useTutorialLayer(o: {
  config: TutorialType,
  onClose: () => void,
}, deps: [openTutorial: boolean]) {
  const [openTutorial] = deps;
  useEffect(() => {
    TutorialAPI.configTutorialType(o.config);
    TutorialAPI.onCloseCallback(o.onClose);
    if (openTutorial) {
      TutorialAPI.openTutorial();
    }
  }, [openTutorial]);
}

export class TutorialAPI {

  private static showTutorialSetter:  Dispatch<SetStateAction<boolean>> | null = null;
  private static tutorialTypeSetter: Dispatch<SetStateAction<TutorialType | null>> | null = null;
  private static onClose: (() => void) | null = null;

  /* Setters from Tutorial Layer */
  static registerShowTutorialSetter(setter: Dispatch<SetStateAction<boolean>>) { this.showTutorialSetter = setter }
  static registerTutorialTypeSetter(setter: Dispatch<SetStateAction<TutorialType | null>>) { this.tutorialTypeSetter = setter  }
  static onCloseCallback(callback: () => void) { this.onClose = callback }

  // Manipulation Methods ------------------------------------------------------------

  static toggleTutorial(boolean?: boolean) {
    if (this.showTutorialSetter !== null) {
      this.showTutorialSetter((prev) =>  boolean ?? !prev);
    }
  }

  static configTutorialType(tutorialType: TutorialType) {
    if (this.tutorialTypeSetter !== null) {
      this.tutorialTypeSetter(tutorialType);
    }
  }

  static openTutorial() {
    this.toggleTutorial(true);
  }

  static closeTutorial() {
    this.toggleTutorial(false);
    if (this.onClose !== null) {
      this.onClose();
      this.onClose = null;
    }
  }
}