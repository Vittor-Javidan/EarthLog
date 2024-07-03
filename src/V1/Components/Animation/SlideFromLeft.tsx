import React, { ReactNode, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, LayoutChangeEvent, Animated } from 'react-native';

export const SlideFromLeft = memo((props: {
  duration: number;
  children: ReactNode;
}) => {
  const { width }                           = Dimensions.get('window');
  const leftOffset                          = useMemo(() => new Animated.Value(-width), []);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  useEffect(() => {
    if (startAnimation) {
      Animated.timing(leftOffset, {
        toValue: 0,
        duration: props.duration,
        useNativeDriver: true,
        delay: 50,
      }).start();
    }
  }, [startAnimation, props.duration]);

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ translateX: leftOffset }],
      }}
      onLayout={(event) => onLayout(event)}
    >
      {props.children}
    </Animated.View>
  );
});
