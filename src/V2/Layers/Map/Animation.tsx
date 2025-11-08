import React, { ReactNode, useMemo, useEffect, memo } from 'react';
import { StyleProp, ViewStyle, Dimensions, Animated } from 'react-native';

export const MapAnimation = memo((props: {
  show: boolean
  children: ReactNode
  style?: StyleProp<ViewStyle>
}) => {

  const { width }  = useMemo(() => Dimensions.get('window'), []);
  const leftOffset = useMemo(() => new Animated.Value(-width), []);

  useEffect(() => {
    Animated.timing(leftOffset, {
      toValue: props.show ? 0 : -width,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [props.show]);

  return (
    <Animated.View
      style={[
        props.style,
        {
          transform: [{ translateX: leftOffset }],
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
});
