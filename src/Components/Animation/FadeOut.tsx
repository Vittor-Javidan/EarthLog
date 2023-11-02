import React, { ReactNode, memo, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export const FadeOut = memo((props: {
  delay: number
  duration: number
  children: ReactNode
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
}) => {

  const opacity = useSharedValue(0);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      opacity.value = withDelay(props.delay, withTiming(1, {
        duration: props.duration,
      }));
    });
    return () => { cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <Animated.View
      style={[
        props.style,
        {
          opacity: opacity,
        },
        useAnimatedStyle(() => ({
          transform: [{ translateX: opacity.value }],
        })),
      ]}
    >
      {props.children}
    </Animated.View>
  );
});
