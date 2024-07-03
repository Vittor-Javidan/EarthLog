import React, { ReactNode, useMemo, useEffect, memo } from 'react';
import { Dimensions, Animated } from 'react-native';

function createOffsets(amount: number, screenWidth: number): number[] {
  const offsets = [];
  for (let i = 0; i < amount; i++) {
    offsets.push(((i) * -screenWidth));
  }
  return offsets;
}

export const CarouselAnimation = memo((props: {
  screensAmount: number
  selectedScreen: number
  children: ReactNode
}) => {

  const { width: SCREEN_WIDTH } = useMemo(() => Dimensions.get('window'), []);
  const CAROUSEL_WIDTH          = useMemo(() => props.screensAmount * SCREEN_WIDTH, []);
  const OFFSETS                 = useMemo(() => createOffsets(props.screensAmount, SCREEN_WIDTH), []);
  const leftOffset              = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.spring(leftOffset, {
      toValue: OFFSETS[props.selectedScreen - 1],
      useNativeDriver: true,
      stiffness: 500,
      damping: 30,
    }).start();
  }, [props.selectedScreen]);

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        height: '100%',
        width: CAROUSEL_WIDTH,
        transform: [{ translateX: leftOffset }],
      }}
    >
      {props.children}
    </Animated.View>
  );
});
