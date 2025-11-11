import React, { memo } from "react";
import { Modal as ReactNative_Modal, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Compass } from "./Compass";
import { CompassAPI } from "../API/Compass";

export const CompassLayer = memo(() => {

  const [showCompass, setShowCompass] = React.useState<boolean>(false);

  CompassAPI.registerShowCompassSetter(setShowCompass);

  if (!showCompass) {
    return <></>;
  }

  return (
    <ReactNative_Modal
      onRequestClose={() => CompassAPI.toggleCompass()}
      animationType="fade"
      statusBarTranslucent={true}
      transparent
      style={{ flex: 1 }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Compass />
      </GestureHandlerRootView>
    </ReactNative_Modal>
  )
});