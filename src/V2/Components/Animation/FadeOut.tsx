import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, AnimatedStyle, withDelay } from 'react-native-reanimated';

export const FadeOut = (props: {
  start: boolean;
  duration: number
  children: ReactNode
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
  onLayout: (event: LayoutChangeEvent) => void
}) => {

  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!props.start) {
    opacity.value = withDelay(50, withTiming(1, { duration: props.duration }));
  }

  return (
    <Animated.View
      style={[
        props.style,
        animatedStyle,
      ]}
      onLayout={(event) => props.onLayout(event)}
    >
      {props.children}
    </Animated.View>
  );
};
