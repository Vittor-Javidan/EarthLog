import React, { ReactNode } from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, useAnimatedStyle } from 'react-native-reanimated';

export const SlideFromLeft = (props: {
  delay: number;
  duration: number;
  children: ReactNode;
}) => {

  const { width } = Dimensions.get('window');
  const leftOffset = useSharedValue(0);

  leftOffset.value = withDelay(
    props.delay,
    withTiming(width, { duration: props.duration })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftOffset.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          left: -width,
        },
        animatedStyle,
      ]}
    >
      {props.children}
    </Animated.View>
  );
};
