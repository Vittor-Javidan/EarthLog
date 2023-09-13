import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useDerivedValue, useSharedValue, runOnJS, useAnimatedStyle } from 'react-native-reanimated';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import Icon from '../Icon';
import H3 from '../Text/H3';
import TextWithIcon from './TextWithIcon';

export default function DeleteSwipeButton(props: {
  buttonRadius?: number
  onSwipe: () => void
  onCancel: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const { width: WIDTH } = useMemo(() => Dimensions.get('window'), []);

  const PADDING = 10;
  const CIRCLE_RADIUS = props.buttonRadius ?? 35;
  const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;
  const THRESHOLD = WIDTH - CIRCLE_DIAMETER - PADDING - PADDING - 10;

  const translateX = useSharedValue(0);
  const circleBackground = useSharedValue(theme.secondary);
  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      WIDTH - (CIRCLE_DIAMETER) - (PADDING * 2),
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
      backgroundColor: translateX.value < THRESHOLD ? theme.wrong : theme.secondary,
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
      circleBackground.value = theme.secondary;
      if (translateX.value < THRESHOLD) {
        translateX.value = 0;
      } else {
        translateX.value = WIDTH - PADDING - CIRCLE_RADIUS;
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
      <TextWithIcon
        iconSide="Right"
        iconName="close"
        title="Cancel"
        onPress={() => props.onCancel()}
        color_background={theme.secondary}
        color_font={theme.onSecondary}
        style={{
          width: 100,
          height: 30,
          paddingRight: 10,
          paddingLeft: 15,
          paddingVertical: 0,
          borderRadius: 15,
        }}
        styleText={{
          paddingVertical: 5,
        }}
      />
      <Animated.View
        style={[{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: CIRCLE_DIAMETER,
          width: '100%',
          paddingLeft: 20,
          backgroundColor: theme.tertiary,
          borderColor: theme.secondary,
          borderRadius: 40,
        }, animatedStyle_slider]}
      >
        <H3 style={{ color: theme.tertiary }}>
          Release to confirm
        </H3>
        <Animated.View
          style={[{
            height: CIRCLE_DIAMETER,
            width: CIRCLE_DIAMETER,
            borderRadius: CIRCLE_RADIUS,
            borderWidth: 3,
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
              height: CIRCLE_DIAMETER,
              width: CIRCLE_DIAMETER,
              borderRadius: CIRCLE_RADIUS,
              borderWidth: 3,
              borderColor: theme.tertiary,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 20,
            }, animatedStyle_circle]}
          >
            <Icon
              iconName="finger-print"
              color={theme.onSecondary}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
}
