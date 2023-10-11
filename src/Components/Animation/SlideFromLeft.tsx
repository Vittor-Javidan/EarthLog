import React, { ReactNode, memo, useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export const SlideFromLeft = memo((props: {
  delay: number
  duration: number
  children: ReactNode
}) => {

  const { width } = useMemo(() => Dimensions.get('window'), []);
  const leftOffset = useSharedValue(0);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      leftOffset.value = withDelay(props.delay, withTiming(width, {
        duration: props.duration,
      }));
    });
    return () => { cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          left: -width,
        },
        useAnimatedStyle(() => ({
          transform: [{ translateX: leftOffset.value }],
        })),
      ]}
    >
      {props.children}
    </Animated.View>
  );
});
