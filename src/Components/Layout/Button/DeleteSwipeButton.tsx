import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useDerivedValue, useSharedValue, runOnJS, useAnimatedStyle } from 'react-native-reanimated';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import H1 from '../Text/H1';
import Icon from '../Icon';
import IconButtonRounded from './IconButtonRounded';

export default function DeleteSwipeButton(props: {
  onSwipe: () => void
  onCancel: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const { width: WIDTH } = useMemo(() => Dimensions.get('window'), []);

  const PADDING = 10;
  const TARGET_AREA_WIDTH = 80;
  const CIRCLE_RADIUS = 40;
  const THRESHOLD = WIDTH - TARGET_AREA_WIDTH - CIRCLE_RADIUS + PADDING;

  const translateX = useSharedValue(0);
  const circleBackground = useSharedValue(theme.tertiary);
  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      WIDTH - (CIRCLE_RADIUS * 2) - (PADDING * 2),
    );
  });

  const animatedStyle_circle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: adjustedTranslateX.value }],
      backgroundColor: circleBackground.value,
    };
  });

  const animatedStyle_slider = useAnimatedStyle(() => {
    return {
      backgroundColor: translateX.value < THRESHOLD ? theme.tertiary : theme.wrong,
    };
  });

  const animatedStyle_targetArea = useAnimatedStyle(() => {
    return {
      backgroundColor: translateX.value < THRESHOLD ? theme.wrong : theme.tertiary,
    };
  });

  function vibrate() {
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
  }

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number }>({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value;
      circleBackground.value = theme.confirm;
      runOnJS(vibrate)();
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      'worklet';
      circleBackground.value = theme.tertiary;
      if (translateX.value < THRESHOLD) {
        translateX.value = 0;
      } else {
        translateX.value = WIDTH - 100;
        runOnJS(vibrate)();
        runOnJS(props.onSwipe)();
      }
    },
  });

  return (
    <View
      style={{
        paddingHorizontal: PADDING,
        width: '100%',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <IconButtonRounded
        iconName="close"
        onPress={() => props.onCancel()}
        showPlusSign={false}
        color_background={theme.secondary}
        color={theme.onSecondary}
      />
      <Animated.View
        style={[{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 80,
          width: '100%',
          paddingLeft: 20,
          backgroundColor: theme.tertiary,
          borderColor: theme.secondary,
          borderRadius: 40,
        }, animatedStyle_slider]}
      >
        <H1 style={{ color: theme.tertiary }}>
          Release to confirm
        </H1>
        <Animated.View
          style={[{
            height: CIRCLE_RADIUS * 2,
            width: TARGET_AREA_WIDTH,
            borderRadius: 40,
            borderWidth: 5,
            borderColor: theme.secondary,
            backgroundColor: theme.wrong,
            justifyContent: 'center',
            alignItems: 'center',
          }, animatedStyle_targetArea]}
        >
          <Icon
            iconName="trash-outline"
            color={theme.onWrong}
          />
        </Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[{
              position: 'absolute',
              left: 0,
              height: CIRCLE_RADIUS * 2,
              width: CIRCLE_RADIUS * 2,
              borderRadius: CIRCLE_RADIUS,
              borderWidth: 5,
              borderColor: theme.secondary,
              backgroundColor: theme.tertiary,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 20,
            }, animatedStyle_circle]}
          >
            <Icon
              iconName="finger-print"
              color={theme.onWrong}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
}
