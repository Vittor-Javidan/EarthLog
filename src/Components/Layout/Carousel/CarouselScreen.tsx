import React, { ReactNode, useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import ConfigService from '@Services/ConfigService';

export default function CarouselScreen(props: {
  selected: number
  screens: JSX.Element[]
  overlayButtons: JSX.Element
}) {

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CarouselButtonsRoot>
        {props.overlayButtons}
      </CarouselButtonsRoot>
      <CarouselAnimation
        selected={props.selected}
        amount={props.screens.length}
      >
        {props.screens}
      </CarouselAnimation>
    </View>
  );
}

function CarouselButtonsRoot(props: {
  children: ReactNode
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const { width: SCREEN_WIDTH } = useMemo(() => Dimensions.get('window'), []);
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
        borderColor: theme.tertiary,
        backgroundColor: theme.tertiary,
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

function CarouselAnimation(props: {
  selected: number
  amount: number
  children: ReactNode
}) {

  const { width: SCREEN_WIDTH } = useMemo(() => Dimensions.get('window'), []);

  return (
    <MotiView
      style={{
        flexDirection: 'row',
        height: '100%',
        width: SCREEN_WIDTH * props.amount,
      }}
      transition={{
        type: 'spring',
        stiffness: 170,
        damping: 25,
      }}
      animate={{
        left: SCREEN_WIDTH - (props.selected * SCREEN_WIDTH),
      }}
    >
      {props.children}
    </MotiView>
  );
}
