import React, { memo, useCallback, useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import { AssetManager, MarkerAssets } from "@AssetManager";
import { HapticsService } from "@V2/Services/HapticsService";
import { Map_MarkerSelectionAPI } from "../API/Map_MarkerSelection";

export const MarkerSelection = memo(() => {

  const {top       , bottom       } = useSafeAreaInsets();
  const {width     , height       } = Dimensions.get('screen');
  const [viewHeight, setViewHeight] = useState<number>(0);

  const DeviceHeight = height - top - bottom

  const AllMarkers = MarkerAssets.map((markerAsset, index) => {
    return (
      <MarkerButton
        key={markerAsset + index}
        markerIcon={markerAsset}
      />
    )
  })

  return (
    <View
      style={{
        marginTop: top,
        height: DeviceHeight,
        width: width,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {viewHeight < DeviceHeight ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
          onLayout={(dimensions) => setViewHeight(dimensions.nativeEvent.layout.height)}
        >
          <>{AllMarkers}</>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <>{AllMarkers}</>
        </ScrollView>
      )}
    </View>
  )
})

export const MarkerButton = memo((props: {
  markerIcon: MarkerAssets
}) => {

  const [pressed   , setPressed   ] = useState<boolean>(false);

  const onPress = useCallback(() => {
    Map_MarkerSelectionAPI.triggerOnMarkerSelect(props.markerIcon);
    Map_MarkerSelectionAPI.closeLayer();
  }, []);

  const onPressOut = useCallback(() => {
    setPressed(false);
  }, []);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{
        borderRadius: 30,
        borderWidth: 3,
        borderColor: pressed ? '#000' : undefined,
        backgroundColor: pressed ? '#000' : '#fff',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
      }}
    >
      <Image
        source={{ uri: AssetManager.getMarkerImage(props.markerIcon) }}
        resizeMode="contain"
        style={{
          height: 40,
          width: 40,
          transform: [{ rotate: `${Map_MarkerSelectionAPI.heading}deg` }]
        }}
      />
    </Pressable>
  )
});