import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, Easing, View, Image } from "react-native";
import * as Vibration from "expo-haptics";

import { AssetManager } from "@AssetManager";
import { translations } from "@V2/Translations/index";
import { ConfigService } from "@V2/Services/ConfigService";
import { useTutorialLayer } from "@V1/Layers/API/Tutorial";
import { useConfirmThreshold } from "../Hooks";

import { Text } from "@V2/Text/index";

export const Display_BubbleLevel = memo((props: {
  pitch: number;
  roll: number;
  z: number;
  dipThreshold: number;
}) => {
  const { pitch, roll, z, dipThreshold } = props;
  const { width }                        = Dimensions.get("screen");
  const config                           = useMemo(() => ConfigService.config, []);
  const R                                = useMemo(() => translations.layers.compass[config.language], []);
  const [showTutorial, setShowTutorial]  = useState(ConfigService.config.tutorial_bubbleLevel);
  const prevRotation                     = useRef(0);
  const isMaxDip = Math.abs(z) < dipThreshold;

  // animation state
  const rotation = useRef(new Animated.Value(0)).current;
  const rotate = rotation.interpolate({
    inputRange: [-720, 720],
    outputRange: ["-720deg", "720deg"],
  });

  // We use the most stable spring from accelerometer to determine the pitch angle to display.
  const pitchComplementaryAngle = 90 - Math.abs(roll);
  let newPitch
  switch (true) {
    case                 pitch >  60:  newPitch =   pitchComplementaryAngle              ; break;
    case pitch <= 60  && pitch >  30 : newPitch =  (pitch + pitchComplementaryAngle) / 2 ; break;
    case pitch <= 30  && pitch > -30:  newPitch =   pitch                                ; break;
    case pitch <= -30 && pitch > -60:  newPitch =  (pitch - pitchComplementaryAngle) / 2 ; break;
    case                 pitch <= -60: newPitch =  -pitchComplementaryAngle              ; break;
    default: newPitch =  pitch;
  }

  useEffect(() => {

    // Garantee smooth rotation animation when crossing the 0/360 degrees boundary
    const targetRotation = roll < 0 ? (90 - newPitch) : -(90 - newPitch);
    let delta = targetRotation - prevRotation.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const nextRotation = prevRotation.current + delta;
    prevRotation.current = nextRotation;

    Animated.timing(rotation, {
      toValue: nextRotation,
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
    <View 
      style={{
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ color: "#fff", fontSize: 30 }}>
        {`${Math.abs(newPitch).toFixed(2)}°`}
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
      </View>
    </View>
  );
});
