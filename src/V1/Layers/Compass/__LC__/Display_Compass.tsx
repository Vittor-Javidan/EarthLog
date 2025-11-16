import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, Easing, Image, Pressable, TextStyle, View } from "react-native";
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
  measuredAverage: number;
  disableAverage: boolean;
  onCalculatedAvg: (heading: number) => void,
}) => {

  const { heading, pitch, roll, horizontalThreshold, measuredAverage, disableAverage } = props;
  const { width }          = Dimensions.get('screen');
  const config             = useMemo(() => ConfigService.config, []);
  const R                  = useMemo(() => translations.layers.compass[config.language], []);
  const rawHeadingHistory     = useRef<number[]>([]);
  const rawHeading         = useRef(0);
  const [isCalculatingAvg, setIsCalculatingAvg] = useState(false);
  const [trueHeading     , setTrueHeading     ] = useState(heading);

  // animation state
  const rotation       = useRef(new Animated.Value(0)).current;
  const rotate         = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });
  
  const isHorizontal = (Math.abs(pitch) < horizontalThreshold && Math.abs(roll) < horizontalThreshold);

  const onCompassPress = useCallback(() => {
    if (disableAverage) return;
    rawHeadingHistory.current = [];
    setIsCalculatingAvg(true);
  }, [disableAverage])

  useEffect(() => {
    // Reset heading history when measuredAverage changes
    rawHeadingHistory.current = [];
  }, [measuredAverage]);

  useEffect(() => {
    // Calculate heading average
    if (
      isCalculatingAvg &&
      rawHeadingHistory.current.length >= measuredAverage
    ) {
      const sum = rawHeadingHistory.current.reduce((a, b) => a + b, 0);
      const avg = Math.abs(sum / rawHeadingHistory.current.length);
      switch (true) {
        case avg < 0:    props.onCalculatedAvg(avg + 360); break;
        case avg >= 360: props.onCalculatedAvg(avg - 360); break;
        default:         props.onCalculatedAvg(avg)      ; break;
      }
      setIsCalculatingAvg(false);
    }
  }, [heading, measuredAverage, isCalculatingAvg]);

  useEffect(() => {
    // Collect heading values for averaging
    if (isCalculatingAvg){
      rawHeadingHistory.current.push(rawHeading.current);
      if (rawHeadingHistory.current.length > measuredAverage) {
        rawHeadingHistory.current.shift();
      }
    }
  }, [heading, measuredAverage, isCalculatingAvg]);

  useEffect(() => {
    // Garantee smooth rotation animation when crossing the 0/360 degrees boundary
    let delta = heading - rawHeading.current;
    if (delta > 180)  delta -= 360;
    if (delta < -180) delta += 360;
    rawHeading.current = rawHeading.current + delta;
  }, [heading])

  useEffect(() => {
    // Converts raw heading to true heading. Keeps it within 0-360 degrees.
    switch (true) {
      case rawHeading.current < 0:    setTrueHeading(rawHeading.current + 360); break;
      case rawHeading.current >= 360: setTrueHeading(rawHeading.current - 360); break;
      default:                        setTrueHeading(rawHeading.current)      ; break;
    }
  }, [heading])

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: rawHeading.current,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [heading]);

  useConfirmThreshold({
    onConfirm: () => Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success)
  }, [isHorizontal])

  return (
    <Pressable
      onPressIn={onCompassPress}
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
      <View
        style={{
          position: 'absolute',
          flexDirection: "row",
          alignSelf: "center",
          top: -40,
        }}
      >
        <Pointer />
      </View>
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
        {isCalculatingAvg && (
          <ActivityIndicator
            size="large"
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: width/2,
            }}
          />
        )}
        <Heading
          heading={trueHeading}
        />
        {isHorizontal && (
          <Text
            style={{
              color: '#0f0',
              fontSize: 24,
            }}
          >
            {R['Horizontal!!!']}
          </Text>
        )}
      </View>
    </Pressable>
  );
});

const Heading = memo((props: {
  heading: number
  style?: TextStyle
}) => {
  return (
    <Text
      style={[{
        color: '#fff',
        fontSize: 24,
      }, props.style]}
    >
      {`${props.heading.toFixed(2)}°`}
    </Text>
  )
});

const Pointer = memo(() => {
  return (
    <Image
      key={'default_compass_pointer'}
      source={{ uri: AssetManager.getCompassImage('COMPASS_POINTER') }}
      style={{
        width: 40,
        height: 40,
        resizeMode: "contain",
      }}
    />
  )
})