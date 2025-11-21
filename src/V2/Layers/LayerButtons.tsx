import { memo, useEffect, useMemo, useState } from "react";
import { Animated, Pressable } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Z_INDEX } from "@V2/Globals/zIndex";
import { useCompassLayer } from "./API/Compass";
import { LayerButtonsAPI } from "./API/LayerButtons";
import { MapAPI } from "./API/Map";

import { Icon } from "@V2/Icon/index";

export const LayerButtons = memo(() => {

  const { bottom }  = useSafeAreaInsets();
  const rightOffset = useMemo(() => new Animated.Value(0), []);
  const [showLayer, setShowLayer] = useState<boolean>(true);

  LayerButtonsAPI.registerShowLayerSetter(setShowLayer);

  useEffect(() => {
    Animated.timing(rightOffset, {
      toValue: showLayer ? 0 : 100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showLayer]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        right: 0,
        bottom: bottom + 130,
        zIndex: Z_INDEX.LAYER_BUTTONS,
        gap: 2,
        transform: [{ translateX: rightOffset }],
      }}
    >
      <CompassButton />
      <MapButton />
    </Animated.View>
  );
});

const CompassButton = memo(() => {

  const [pressed    , setPressed    ] = useState<boolean>(false);
  const [openCompass, setOpenCompass] = useState<boolean>(false);

  useCompassLayer({
    config: { mode: 'default' },
    onMeasurementTake: (heading, dip) => {},
    onCompassClose: () => setOpenCompass(false),
  }, [openCompass, undefined]);

  return (
    <Pressable
      onPress={() => setOpenCompass(true)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        backgroundColor: pressed ? 'red' : 'white',
        height: 60,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
      }}
    >
      <Icon
        iconName="compass"
        color={pressed ? "white" : "red"}
        fontSize={30}
      />
    </Pressable>
  );
});

const MapButton = memo(() => {
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <Pressable
      onPress={() => MapAPI.toggleMap()}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        backgroundColor: pressed ? 'red' : 'white',
        height: 60,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
      }}
    >
      <Icon
        iconName="map"
        color={pressed ? "white" : "red"}
        fontSize={30}
      />
    </Pressable>
  );
});

