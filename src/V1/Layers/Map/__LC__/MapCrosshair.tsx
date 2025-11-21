import React, { memo } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const MapCrosshair = memo((props: {
  show: boolean
}) => {
  const { top, bottom} = useSafeAreaInsets();
  const { height, width } = Dimensions.get('screen')
  return props.show ? (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        height: height - top - bottom,
        width: width,
        zIndex: 21,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
        }}
      >
        <View
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
          }}
        />
        <View
          style={{
            flex: 1,
            borderLeftWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
        }}
      >
        <View
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
          }}
        />
        <View
          style={{
            flex: 1,
            borderLeftWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
          }}
        />
      </View>
    </View>
  ) : <></>;
});