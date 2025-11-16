import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Image, TextStyle, Pressable, ActivityIndicator, View } from "react-native";
import * as Vibration from "expo-haptics";

import { AssetManager } from "@AssetManager";
import { translations } from "@V2/Translations/index";
import { ConfigService } from "@V2/Services/ConfigService";
import { useTutorialLayer } from "@V2/Layers/API/Tutorial";
import { useConfirmThreshold } from "../Hooks";

import { Text } from "@V2/Text/index";

export const Display_BubbleLevel = memo((props: {
  pitch: number;
  roll: number;
  z: number;
  dipThreshold: number;
  measuredAverage: number;
  disableAverage: boolean;
  onCalculatedAvg: (dip: number) => void;
}) => {
  const { pitch, roll, z, dipThreshold, measuredAverage, disableAverage } = props;
  const { width }          = Dimensions.get("screen");
  const config             = useMemo(() => ConfigService.config, []);
  const R                  = useMemo(() => translations.layers.compass[config.language], []);
  const dipHistory         = useRef<number[]>([]);
  const normalizedRotation = useRef(0);

  const [showTutorial    , setShowTutorial    ] = useState(ConfigService.config.tutorial_bubbleLevel);
  const [isCalculatingAvg, setIsCalculatingAvg] = useState(false);
  const isMaxDip = Math.abs(z) < dipThreshold;

  // animation state
  const rotation = useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [-720, 720],
    outputRange: ["-720deg", "720deg"],
  });

  // We use the most stable spring from accelerometer to determine the pitch angle to display.
  const pitchComplementaryAngle = 90 - Math.abs(roll);
  let trueDip
  switch (true) {
    case                pitch >   60:  trueDip =   pitchComplementaryAngle              ; break;
    case pitch <= 60 && pitch >   30:  trueDip =  (pitch + pitchComplementaryAngle) / 2 ; break;
    case pitch <= 30 && pitch >  -30:  trueDip =   pitch                                ; break;
    case pitch <=-30 && pitch >  -60:  trueDip =  (pitch - pitchComplementaryAngle) / 2 ; break;
    case                pitch <= -60:  trueDip =  -pitchComplementaryAngle              ; break;
    default: trueDip =  pitch;
  }

  const onBubbleLevelPress = useCallback(() => {
    if (disableAverage) return;
    dipHistory.current = [];
    setIsCalculatingAvg(true);
  }, [disableAverage])

  useEffect(() => {
    // Reset pitch history when measuredAverage changes
    dipHistory.current = [];
  }, [measuredAverage]);

  useEffect(() => {
    // Calculate dip average
    if (
      isCalculatingAvg &&
      dipHistory.current.length >= measuredAverage
    ) {
      const sum = dipHistory.current.reduce((a, b) => a + b, 0);
      const avg = sum / dipHistory.current.length;
      setIsCalculatingAvg(false);
      props.onCalculatedAvg(Math.abs(avg));
    }
  }, [pitch, roll, measuredAverage, isCalculatingAvg]);

  useEffect(() => {
    // Collect pitch values for averaging
    if (isCalculatingAvg) {
      dipHistory.current.push(trueDip);
      if (dipHistory.current.length > measuredAverage) {
        dipHistory.current.shift();
      }
    }
  }, [pitch, roll, measuredAverage, isCalculatingAvg]);

  useEffect(() => {
    // Garantee smooth rotation animation when crossing the 0/360 degrees boundary
    const targetRotation = roll < 0 ? (90 - trueDip) : -(90 - trueDip);
    let delta = targetRotation - normalizedRotation.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    normalizedRotation.current = normalizedRotation.current + delta;
  }, [pitch, roll])

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: normalizedRotation.current,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [pitch, roll]);

  useConfirmThreshold({
    onConfirm: () => Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success),
  },[isMaxDip]);

  useTutorialLayer({
    config: "BUBBLE LEVEL COMPASS",
    onClose: () => setShowTutorial(false),
  }, [showTutorial]);

  return (
    <Pressable
      onPressIn={onBubbleLevelPress}
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
      <View
        style={{
          position: "absolute",
          top: -40,
        }}
      >
        <Angle
          angle={trueDip}
        />
        {isCalculatingAvg && (
          <ActivityIndicator
            size="large"
            style={{
              position: "absolute",
              right: -40,
            }}
          />
        )}
      </View>
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
            paddingBottom: 100,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ rotate }],
          }}
        >
            <Text 
              style={{
                fontSize: 24,
                color: "#0f0",
              }}
            >
              {R['Max Dip!!!']}
            </Text>
        </Animated.View>
      )}
    </Pressable>
  );
});

const Angle = memo((props: {
  angle: number
  style?: TextStyle
}) => {
  return (
    <Text
      style={[{
        color: '#fff',
        fontSize: 24,
      }, props.style]}
    >
      {`${Math.abs(props.angle).toFixed(2)}°`}
    </Text>
  )
});