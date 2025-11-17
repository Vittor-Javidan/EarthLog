import React, { memo, useState } from "react";
import { Modal as ReactNative_Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Map_MarkerSelectionAPI } from "../API/Map_MarkerSelection";
import { MarkerSelection } from "./MarkerSelection";

export const Map_MarkeSelectionLayer = memo(() => {

  const [showLayer, setShowLayer] = useState<boolean>(false);

  Map_MarkerSelectionAPI.registerShowLayerSetter(setShowLayer);

  if (!showLayer) {
    return <></>;
  }

  return (
    <ReactNative_Modal
      onRequestClose={() => Map_MarkerSelectionAPI.closeLayer()}
      animationType="fade"
      statusBarTranslucent={true}
      transparent
      style={{ flex: 1 }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MarkerSelection />
      </GestureHandlerRootView>
    </ReactNative_Modal>
  );
})