import React, { memo, useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Image, View } from "react-native";
import * as Vibration from 'expo-haptics'

import { AssetManager } from "@AssetManager";
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
              {'Horizontal!!!'}
            </Text>
          </View>
        )}
      </View>
      </View>
    </View>
  );
});