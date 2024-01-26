import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle, AnimatedStyle } from 'react-native-reanimated';

export const FadeOut = (props: {
  delay: number
  duration: number
  children: ReactNode
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
}) => {

  const opacity = useSharedValue(0);

  opacity.value = withDelay(props.delay, withTiming(1, {
    duration: props.duration,
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        props.style,
        animatedStyle,
      ]}
    >
      {props.children}
    </Animated.View>
  );
};
