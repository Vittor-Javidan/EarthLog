import React, { ReactNode, useMemo, useEffect, memo } from 'react';
import { StyleProp, ViewStyle, Dimensions, Animated } from 'react-native';

export const DrawerAnimation = memo((props: {
  show: boolean
  children: ReactNode
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
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
    <Animated.ScrollView
      contentContainerStyle={props.contentContainerStyle}
      style={[
        props.style,
        {
          transform: [{ translateX: leftOffset }],
        },
      ]}
    >
      {props.children}
    </Animated.ScrollView>
  );
});
