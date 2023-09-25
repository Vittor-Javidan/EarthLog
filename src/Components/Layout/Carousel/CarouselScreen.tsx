import React, { ReactNode, useMemo, useEffect, memo } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function getOffSets(amount: number) {
  const offsets = [];
  for (let i = 0; i < amount; i++) {
    offsets.push(((i)  * -SCREEN_WIDTH));
  }
  return offsets;
}

export const CarouselScreen = memo((props: {
  selected: number
  screens: JSX.Element[]
  overlayButtons: JSX.Element
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.carousel, []);
  const CAROUSEL_WIDTH = useMemo(() => props.screens.length * SCREEN_WIDTH, []);
  const OFFSETS = useMemo(() => getOffSets(props.screens.length), []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background_Screens,
      }}
    >
      <CarouselButtonsRoot
        theme={theme}
      >
        {props.overlayButtons}
      </CarouselButtonsRoot>
      <CarouselAnimation
        offset={OFFSETS[props.selected - 1]}
        width={CAROUSEL_WIDTH}
      >
        {props.screens}
      </CarouselAnimation>
    </View>
  );
});

function CarouselButtonsRoot(props: {
  children: ReactNode
  theme: {
    border: string
    background: string
  }
}) {

  const MARGIN = 10;

  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        zIndex: 1,
        alignSelf: 'center',
        width: SCREEN_WIDTH - MARGIN - MARGIN,
        height: 35,
        borderColor: props.theme.border,
        backgroundColor: props.theme.background,
        borderRadius: 20,
        borderWidth: 2,
        top: 10,
        gap: 2,
      }}
    >
      {props.children}
    </View>
  );
}

const CarouselAnimation = memo((props: {
  width: number
  offset: number
  children: ReactNode
}) => {

  const leftOffset = useSharedValue(0);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      leftOffset.value = withSpring(props.offset, {
        stiffness: 170,
        damping: 25,
      });
    });
    return () => { cancelAnimationFrame(animationFrameId); };
  }, [props.offset]);

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          height: '100%',
          width: props.width,
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
