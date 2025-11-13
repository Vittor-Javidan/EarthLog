import React, { memo, useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Image, View } from "react-native";
import { AssetManager } from "@AssetManager";

import { Text } from "@V1/Text/index";

export const Display_Compass = memo((props: {
  isHorizontal: boolean,
  heading: number,
}) => {

  const { width } = Dimensions.get('screen');
  const rotation = useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: props.heading,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [props.heading]);

  return (
    <View
      style={{
        paddingBottom: 80,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 30,
        }}
      >
        {`${props.heading.toFixed(2)}°`}
      </Text>
      <Image
        key={'default_compass_pointer'}
        source={{ uri: AssetManager.getCompassImage('COMPASS_POINTER') }}
        style={{
          height: 40,
          width: 40,
          justifyContent: "center",
          alignItems: "center",
          resizeMode: "contain",
        }}
      />
      <View
        style={{
          borderRadius: (width) / 2,
          borderColor: props.isHorizontal ? 'green' : undefined,
          borderWidth: 8,
        }}
      >
      <Animated.Image
        key={'default_compass'}
        source={{ uri: AssetManager.getCompassImage('COMPASS_BG') }}
        style={{
          height: width - 80,
          width: width - 80,
          justifyContent: "center",
          alignItems: "center",
          resizeMode: "contain",
          transform: [{ rotate }],
        }}
      />
      </View>
    </View>
  );
});