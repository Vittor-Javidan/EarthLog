import React, { ReactNode, useMemo, memo, useState, useTransition, useCallback } from 'react';
import { View, Dimensions } from 'react-native';

import { ThemeService } from '@V2/Services_Core/ThemeService';
import { useBackPress } from '@V2/Hooks/index';
import { ConfigService } from '@V2/Services/ConfigService';

import { IconName } from '@V2/Icon/index';
import { CarouselButton } from './CarouselButton';
import { CarouselAnimation } from './Animation';

type buttonData = {
  title: string
  iconName?: IconName
}

export const Carousel = memo((props: {
  buttonData: buttonData[]
  screens: React.JSX.Element[]
  onBackPress: () => void
}) => {

  const [_, startTransitions]                = useTransition();
  const config                               = useMemo(() => ConfigService.config, []);
  const theme                                = useMemo(() => ThemeService.appThemes[config.appTheme].layout.carousel, []);
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
        screensAmount={props.screens.length}
        selectedScreen={selectedScreen}
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

  const { width: SCREEN_WIDTH } = useMemo(() => Dimensions.get('window'), []);

  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        zIndex: 1,
        alignSelf: 'center',
        width: SCREEN_WIDTH - 20,
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
