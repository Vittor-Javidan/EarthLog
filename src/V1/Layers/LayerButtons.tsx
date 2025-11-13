import { memo, useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Z_INDEX } from "@V1/Globals/zIndex";
import { useCompassLayer } from "./API/Compass";
import { MapAPI } from "./API/Map";

import { Icon } from "@V1/Icon/index";

export const LayerButtons = memo(() => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        position: 'absolute',
        right: 0,
        bottom: bottom + 90,
        zIndex: Z_INDEX.LAYER_BUTTONS,
        gap: 2,
      }}
    >
      <CompassButton />
      <MapButton />
    </View>
  );
});

const CompassButton = memo(() => {

  const [pressed    , setPressed    ] = useState<boolean>(false);
  const [openCompass, setOpenCompass] = useState<boolean>(false);

  useCompassLayer({
    config: { type: 'default' },
    onMeasurementTake: (heading, dip) => {},
    onCompassClose: () => setOpenCompass(false),
  }, [openCompass]);

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

