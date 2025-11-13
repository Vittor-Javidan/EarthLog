import React, { memo, useState } from "react";
import { Modal as ReactNative_Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CompassLayerConfig } from "@V2/Types/AppTypes";
import { CompassAPI } from "../API/Compass";

import { Compass_Default } from "./CompassTypes/Compass_Default";

export const CompassLayer = memo(() => {

  const [showCompass  , setShowCompass  ] = useState<boolean>(false);
  const [compassConfig, setCompassConfig] = useState<CompassLayerConfig | any>(null);

  CompassAPI.registerShowCompassSetter(setShowCompass);
  CompassAPI.registerCompassConfigSetter(setCompassConfig);

  if (!showCompass || compassConfig === null) {
    return <></>;
  }

  return (
    <ReactNative_Modal
      onRequestClose={() => CompassAPI.closeCompass()}
      animationType="fade"
      statusBarTranslucent={true}
      transparent
      style={{ flex: 1 }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {compassConfig.type === 'default' && (<Compass_Default config={compassConfig} />)}
      </GestureHandlerRootView>
    </ReactNative_Modal>
  )
});