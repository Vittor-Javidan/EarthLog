import React, { useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { convertToRGBA, interpolateColor, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import ConfigService from '@Services/ConfigService';

export function ColorPicker(props: {
  colorInputPadding: number
  colorInputWidth: number
  colorInputHeight: number
  pickerHeight: number
  pickerWidth: number
  borderRadius: number
  onColorSelected: (hexColor: string) => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const GRADIENT_COLORS = useMemo<string[]>(() => [
    '#000000', // Black
    '#0000FF', // Blue
    '#00FF00', // Green
    '#00FFFF', // Cyan
    '#FF0000', // Red
    '#FF00FF', // Magenta
    '#FFFF00', // Yellow
    '#FFFFFF', // White
  ], []);

  // Shared Values
  const translateX = useSharedValue(0);
  const lastHexColor = useSharedValue('#000000');
  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      props.colorInputWidth - props.pickerWidth - (props.colorInputPadding * 2),
    );
  });

  // Animated Style
  const animatedStyle = useAnimatedStyle(() => {

    function toHex(c: number) {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }

    const inputRange = GRADIENT_COLORS.map((_, index) => (index / (GRADIENT_COLORS.length - 0.5)) * (props.colorInputWidth + (props.colorInputPadding * 2)));
    const pickerColor = interpolateColor(translateX.value, inputRange, GRADIENT_COLORS,'RGB');
    const pickerRGBAColorArray = convertToRGBA(pickerColor);
    const r = Math.round(pickerRGBAColorArray[0] * 255);
    const g = Math.round(pickerRGBAColorArray[1] * 255);
    const b = Math.round(pickerRGBAColorArray[2] * 255);
    const pickerHexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    lastHexColor.value = pickerHexColor;

    return {
      transform: [{ translateX: adjustedTranslateX.value }],
      backgroundColor: lastHexColor.value,
    };
  });

  // Gestures Events
  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number }>({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      'worklet';
      runOnJS(props.onColorSelected)(lastHexColor.value);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={{
          justifyContent: 'center',
        }}
      >
        {/*Color Gradient*/}
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={{ x: 0, y: 0}}
          end={{ x: 1, y: 0}}
          style={{
            height: props.colorInputHeight,
            width: props.colorInputWidth - (props.colorInputPadding * 2),
            borderRadius: props.borderRadius,
          }}
        />

        {/*PICKER CIRCLE*/}
        <Animated.View
          style={[
            {
              position: 'absolute',
              backgroundColor: theme.primary,
              width: props.pickerWidth,
              height: props.pickerHeight,
              borderRadius: props.borderRadius,
              borderWidth: 1,
              borderColor: 'black',
            },
            animatedStyle,
          ]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}


