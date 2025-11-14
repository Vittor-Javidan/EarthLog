import React, { memo, useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, Easing, Image, View } from "react-native";
import * as Vibration from 'expo-haptics'

import { AssetManager } from "@AssetManager";
import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";
import { useConfirmThreshold } from "../Hooks";

import { Text } from "@V1/Text/index";

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
  const headingHistory = useRef<number[]>([]);
  const prevHeading = useRef(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });

  const isHorizontal = (Math.abs(pitch) < horizontalThreshold && Math.abs(roll) < horizontalThreshold);

  useEffect(() => {

    let delta = heading - prevHeading.current;
    if (delta > 180)  delta -= 360;
    if (delta < -180) delta += 360;
    const unwrapped = prevHeading.current + delta;
    prevHeading.current = unwrapped;

    // --- keep last 10 unwrapped values ---
    headingHistory.current.push(unwrapped);
    if (headingHistory.current.length > 10)
      headingHistory.current.shift();

    // --- compute smoothed average of unwrapped values ---
    const sum = headingHistory.current.reduce((a, b) => a + b, 0);
    const avgUnwrapped = sum / headingHistory.current.length;

    Animated.timing(rotation, {
      toValue: avgUnwrapped,
      duration: 500,
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
          {isHorizontal && (
            <View
              style={{
                position: 'absolute',
                width: width - 80,
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: '#0f0',
                  fontSize: 24,
                }}
              >
                {R['Horizontal!!!']}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});