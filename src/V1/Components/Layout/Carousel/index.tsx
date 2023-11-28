import React, { ReactNode, useMemo, useEffect, memo, useState, useTransition, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useBackPress } from '@V1/Hooks/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { IconName } from '@V1/Icon/index';
import { CarouselButton } from './CarouselButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function getOffSets(amount: number) {
  const offsets = [];
  for (let i = 0; i < amount; i++) {
    offsets.push(((i)  * -SCREEN_WIDTH));
  }
  return offsets;
}

type buttonData = {
  title: string
  iconName?: IconName
}

export const Carousel = memo((props: {
  buttonData: buttonData[]
  screens: JSX.Element[]
  onBackPress: () => void
}) => {

  const [_, startTransitions] = useTransition();

  const config         = useMemo(() => ConfigService.config, []);
  const theme          = useMemo(() => ThemeService.appThemes[config.appTheme].layout.carousel, []);
  const CAROUSEL_WIDTH = useMemo(() => props.screens.length * SCREEN_WIDTH, []);
  const OFFSETS        = useMemo(() => getOffSets(props.screens.length), []);
  const [selectedScreen , setSelectedScreen] = useState<number>(1);

  const onChangeScreen = useCallback((nextScreen: number) => {
    startTransitions(() => setSelectedScreen(nextScreen));
  }, []);

  const OverlayButtons = props.buttonData.map((data, index) => {

    const isFirst      = index === 0;
    const isLast       = index === props.screens.length - 1;
    const screenNumber = index + 1;

    return (
      <CarouselButton
        key={data.title + data.iconName}
        title={data.title}
        iconName={data.iconName}
        selected={selectedScreen === screenNumber}
        onPress={() => onChangeScreen(screenNumber)}
        type={isFirst ? 'left' : isLast ? 'right' : 'middle'}
      />
    );
  });

  useBackPress(() => {
    selectedScreen !== 1 ? onChangeScreen(1) : props.onBackPress();
  }, [selectedScreen]);

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
        {OverlayButtons}
      </CarouselButtonsRoot>
      <CarouselAnimation
        offset={OFFSETS[selectedScreen - 1]}
        width={CAROUSEL_WIDTH}
      >
        {props.screens}
      </CarouselAnimation>
    </View>
  );
});

const CarouselButtonsRoot = memo((props: {
  children: ReactNode
  theme: {
    border: string
    background: string
  }
}) => {

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
        elevation: 3,
      }}
    >
      {props.children}
    </View>
  );
});

const CarouselAnimation = memo((props: {
  width: number
  offset: number
  children: ReactNode
}) => {

  const leftOffset = useSharedValue(0);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      leftOffset.value = withSpring(props.offset, {
        stiffness: 500,
        damping: 30,
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
