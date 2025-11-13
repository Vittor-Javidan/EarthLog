import React, { memo, useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, Easing, Image, View } from "react-native";
import * as Vibration from 'expo-haptics'

import { AssetManager } from "@AssetManager";
import { translations } from "@V2/Translations/index";
import { ConfigService } from "@V2/Services/ConfigService";
import { useConfirmThreshold } from "../Hooks";

import { Text } from "@V2/Text/index";

export const Display_Compass = memo((props: {
  heading: number,
  pitch: number,
  roll: number,
  horizontalThreshold: number,
}) => {

  const { heading, pitch, roll, horizontalThreshold } = props;
  const { width } = Dimensions.get('screen');
  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.layers.compass[config.language], []);
  const rotation = useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });

  const isHorizontal = (Math.abs(pitch) < horizontalThreshold && Math.abs(roll) < horizontalThreshold);

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: heading,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [heading]);

  useConfirmThreshold({
    onConfirm: () => Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success)
  }, [isHorizontal])

  return (
    <View
      style={{
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
        {`${heading.toFixed(2)}°`}
      </Text>
      <Image
        key={'default_compass_pointer'}
        source={{ uri: AssetManager.getCompassImage('COMPASS_POINTER') }}
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          resizeMode: "contain",
        }}
      />
      <View
        style={{
          borderRadius: (width) / 2,
          borderColor: isHorizontal ? '#0f0' : undefined,
          borderWidth: 8,
          borderTopColor:    pitch >  horizontalThreshold ? '#f00' : undefined,
          borderBottomColor: pitch < -horizontalThreshold ? '#f00' : undefined,
          borderLeftColor:   roll  >  horizontalThreshold ? '#f00' : undefined,
          borderRightColor:  roll  < -horizontalThreshold ? '#f00' : undefined,
        }}
      >
        <View>
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
          <View
            style={{
              position: 'absolute',
              width: width - 80,
              height: width - 80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isHorizontal ? (
              <Text
                style={{
                  color: '#0f0',
                  fontSize: 24,
                }}
              >
                {R['Horizontal!!!']}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  color: "#f00",
                  maxWidth: width - 250,
                }}
              >
                {R['Keep the device on horizontal']}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
});