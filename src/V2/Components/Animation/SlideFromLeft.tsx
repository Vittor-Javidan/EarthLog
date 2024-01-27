import React, { ReactNode } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export const SlideFromLeft = (props: {
  start: boolean;
  duration: number;
  children: ReactNode;
  onLayout: (event: LayoutChangeEvent) => void
}) => {

  const { width } = Dimensions.get('window');
  const leftOffset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftOffset.value }],
  }));

  if (props.start) {
    leftOffset.value = withTiming(width, { duration: props.duration });
  }

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          left: -width,
        },
        animatedStyle,
      ]}
      onLayout={(event) => props.onLayout(event)}
    >
      {props.children}
    </Animated.View>
  );
};
