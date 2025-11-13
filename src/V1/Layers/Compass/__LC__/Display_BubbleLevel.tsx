import React, { memo, useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, View, Image } from "react-native";
import * as Vibration from "expo-haptics";

import { AssetManager } from "@AssetManager";
import { useConfirmThreshold } from "../Hooks";

import { Text } from "@V1/Text/index";

export const Display_BubbleLevel = memo((props: {
  pitch: number;
  roll: number;
  z: number;
  dipThreshold: number;
}) => {
  const { pitch, roll, z, dipThreshold } = props;
  const { width } = Dimensions.get("screen");

  // animation state
  const rotation = useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [-360, 360],
    outputRange: ["-360deg", "360deg"],
    extrapolate: "clamp",
  });

  const smoothPitch = useRef(pitch);
  const lastPitch = useRef(pitch);
  const isMaxDip = Math.abs(z) < dipThreshold;

  useEffect(() => {

    // --- smooth pitch (low-pass filter) ---
    const alpha = 0.15; // smoothing strength (0.1–0.3 works well)
    smoothPitch.current =
      smoothPitch.current + alpha * (pitch - smoothPitch.current);

    // --- debounce small changes ---
    if (Math.abs(smoothPitch.current - lastPitch.current) < 0.3) return;
    lastPitch.current = smoothPitch.current;

    // --- avoid 90° singularity ---
    const clamped = Math.min(89.9, Math.max(-89.9, smoothPitch.current));

    const toValue = roll < 0 ? (90 - clamped) : -(90 - clamped);

    Animated.timing(rotation, {
      toValue,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [pitch, roll]);

  useConfirmThreshold({
    onConfirm: () => Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success),
  },[isMaxDip]);

  return (
    <View 
      style={{
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ color: "#fff", fontSize: 30 }}>
        {`${Math.abs(pitch).toFixed(2)}°`}
      </Text>
      <View
        style={{
          borderRadius: width / 2,
          borderColor: isMaxDip ? "#0f0" : undefined,
          borderWidth: 8,
          height: width - 64,
          width: width - 64,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* grid image */}
        <Image
          key={"bubble_level_grid"}
          source={{
            uri: AssetManager.getCompassImage("COMPASS_BUBBLE_LEVEL_GRID"),
          }}
          style={{
            position: "absolute",
            height: width - 80,
            width: width - 80,
            resizeMode: "contain",
          }}
        />

        {/* rotating bubble image */}
        <Animated.Image
          key={"bubble_level_compass"}
          source={{
            uri: AssetManager.getCompassImage("COMPASS_BUBBLE_LEVEL"),
          }}
          style={{
            position: "absolute",
            height: width - 80,
            width: width - 80,
            resizeMode: "contain",
            transform: [{ rotate }],
          }}
        />

        {isMaxDip && (
          <Animated.View
            style={{
              position: "absolute",
              width: width - 80,
              height: width - 80,
              justifyContent: "center",
              alignItems: "center",
              transform: [{ rotate }],
            }}
          >
            <Text style={{ color: "#0f0", fontSize: 24 }}>Max Dip!!!</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
});
