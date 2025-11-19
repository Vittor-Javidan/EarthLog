import { memo, useState } from "react";
import { Modal as ReactNative_Modal } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { TutorialType } from "@V2/Types/AppTypes";
import { TutorialAPI } from "../API/Tutorial";
import { Tutorial_BubbleLevel } from "./BubbleLevel";
import { Tutorial_Map } from "./Map";

export const TutorialLayer = memo(() => {

  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [tutorialType, setTutorialType] = useState<TutorialType | null>(null);

  TutorialAPI.registerShowTutorialSetter(setShowTutorial);
  TutorialAPI.registerTutorialTypeSetter(setTutorialType);

  if (!showTutorial || tutorialType === null) {
    return <></>;
  }

  return (
    <ReactNative_Modal
      onRequestClose={() => TutorialAPI.closeTutorial()}
      animationType="fade"
      statusBarTranslucent={true}
      transparent
      style={{ flex: 1 }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {tutorialType === "BUBBLE LEVEL COMPASS" && (<Tutorial_BubbleLevel onFinish={() => TutorialAPI.closeTutorial()}/>)}
        {tutorialType === "MAP" && (<Tutorial_Map onFinish={() => TutorialAPI.closeTutorial()}/>)}
      </GestureHandlerRootView>
    </ReactNative_Modal>
  )
});