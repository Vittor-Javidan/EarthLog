import React, { ReactNode, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';

export const FadeOut = memo((props: {
  duration: number
  children: ReactNode
  style?: StyleProp<ViewStyle>
}) => {
  const opacity                             = useMemo(() => new Animated.Value(0), []);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  useEffect(() => {
    if (startAnimation) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: props.duration,
        useNativeDriver: true,
        delay: 50,
      }).start();
    }
  }, [startAnimation, props.duration]);

  return (
    <Animated.View
      style={[
        props.style,
        { opacity },
      ]}
      onLayout={(event) => onLayout(event)}
    >
      {props.children}
    </Animated.View>
  );
});
