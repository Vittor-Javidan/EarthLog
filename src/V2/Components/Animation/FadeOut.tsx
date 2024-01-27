import React, { ReactNode, memo, useCallback, useState } from 'react';
import { StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, AnimatedStyle, withDelay } from 'react-native-reanimated';

export const FadeOut = memo((props: {
  duration: number
  children: ReactNode
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
}) => {

  const opacity                             = useSharedValue(0);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  if (startAnimation) {
    opacity.value = withDelay(50, withTiming(1, { duration: props.duration }));
  }

  return (
    <Animated.View
      style={[
        props.style,
        animatedStyle,
      ]}
      onLayout={(event) => onLayout(event)}
    >
      {props.children}
    </Animated.View>
  );
});
