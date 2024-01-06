import React, { ReactNode, memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export const FadeOut = memo((props: {
  delay: number
  duration: number
  children: ReactNode
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
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
});

