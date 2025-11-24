import React, { memo, useCallback, useState } from "react";
import { Image, Pressable } from "react-native";

import {
  WidgetTheme
} from "@V2/Types";

import { AssetManager, MarkerAssets } from "@AssetManager";
import { HapticsService } from "@V2/Services/HapticsService";
import { useMap_MarkerSelectionLayer } from "@V2/Layers/API/Map_MarkerSelection";

export const MarkerButton = memo((props: {
  markerIcon: MarkerAssets
  imageHeading: number
  lockedData: boolean | undefined
  theme: WidgetTheme
  onMarkerChange: (mapMarker: MarkerAssets) => void
}) => {

  const [markerIcon,setMarkerIcon ] = useState<MarkerAssets>(props.markerIcon);
  const [pressed   , setPressed   ] = useState<boolean>(false);
  const [show      , setShow      ] = useState({
    mapMarkerLayer: false
  });

  const onPress = useCallback(() => {
    if (props.lockedData) { return; }
    setShow(prev => ({ ...prev, mapMarkerLayer: true }));
  }, [props.lockedData, props.onMarkerChange]);

  const onPressOut = useCallback(() => {
    setPressed(false);
  }, []);

  const onPressIn = useCallback(() => {
    if (props.lockedData) { return; }
    setPressed(true);
    HapticsService.vibrate('success');
  }, [props.lockedData]);

  const onMarkerSelect = useCallback((mapMarker: MarkerAssets) => {
    props.onMarkerChange(mapMarker);
    setMarkerIcon(mapMarker);
    setShow(prev => ({ ...prev, mapMarkerLayer: false }));
  }, [props.onMarkerChange]);

  const onLayerClose = useCallback(() => {
    setShow(prev => ({ ...prev, mapMarkerLayer: false }));
  }, []);

  useMap_MarkerSelectionLayer({
    onMarkerSelect: (markerName: MarkerAssets) => onMarkerSelect(markerName),
    onLayerClose: () => onLayerClose(),
  }, [show.mapMarkerLayer, markerIcon, props.imageHeading]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{
        borderRadius: 30,
        borderWidth: 3,
        borderColor: pressed ? props.theme.background : props.theme.font,
        backgroundColor: pressed ? props.theme.font : props.theme.background,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
      }}
    >
      <Image
        source={{ uri: AssetManager.getMarkerImage(markerIcon) }}
        resizeMode="contain"
        style={{
          height: 40,
          width: 40,
          transform: [{ rotate: `${props.imageHeading}deg` }],
        }}
      />
    </Pressable>
  )
});