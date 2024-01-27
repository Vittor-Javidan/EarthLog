import React, { ReactNode, memo, useCallback, useState } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withDelay } from 'react-native-reanimated';

export const SlideFromLeft = memo((props: {
  duration: number;
  children: ReactNode;
}) => {

  const { width }                           = Dimensions.get('window');
  const leftOffset                          = useSharedValue(0);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftOffset.value }],
  }));

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  if (startAnimation) {
    leftOffset.value = withDelay(50, withTiming(width, { duration: props.duration }));
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
      onLayout={(event) => onLayout(event)}
    >
      {props.children}
    </Animated.View>
  );
});
