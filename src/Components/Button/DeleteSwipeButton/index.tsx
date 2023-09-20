import React, { useMemo, useState } from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useDerivedValue, useSharedValue, runOnJS, useAnimatedStyle } from 'react-native-reanimated';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import { Icon } from '@Icon/index';
import { Text } from '@Text/index';

export default function DeleteSwipeButton(props: {
  buttonRadius?: number
  compensateMargin?: number
  onSwipe: () => void
  onCancel: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const { width: WIDTH } = useMemo(() => Dimensions.get('window'), []);

  const COMPENSATE_MARGIN = props.compensateMargin ?? 0;
  const PADDING = 10;
  const CIRCLE_RADIUS = props.buttonRadius ?? 35;
  const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;
  const THRESHOLD = WIDTH - CIRCLE_DIAMETER - PADDING - PADDING - 10 - COMPENSATE_MARGIN - COMPENSATE_MARGIN;

  const translateX = useSharedValue(0);
  const circleBackground = useSharedValue(theme.secondary);
  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      WIDTH - (CIRCLE_DIAMETER) - (PADDING * 2) - (COMPENSATE_MARGIN * 2),
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
      <CancelButton
        onPress={() => props.onCancel()}
        theme={{
          font: theme.onSecondary,
          font_Pressed: theme.secondary,
          background: theme.secondary,
          background_Pressed: theme.onSecondary,
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
        <Text.H3 style={{ color: theme.tertiary }}>
          Release to confirm
        </Text.H3>
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

type ButtonTheme = {
  font: string
  font_Pressed: string
  background: string
  background_Pressed: string
}

function CancelButton(props: {
  theme: ButtonTheme
	onPress: () => void
}): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  function onPress() {
    props.onPress();
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

	return (
		<Pressable
			onPressIn={() => onPressIn()}
			onPressOut={() => setPressed(false)}
			onPress={() => onPress()}
			style={{
				backgroundColor: pressed ? props.theme.background_Pressed : props.theme.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        height: 30,
        borderRadius: 15,
        paddingVertical: 0,
				paddingHorizontal: 10,
			}}
		>
      <Text.Root
				style={{
					fontSize: 200,
          color: props.theme.font,
          paddingVertical: 5,
				}}
			>
				{'Cancel'}
			</Text.Root>
      <Icon
        iconName="close"
        color={props.theme.font}
      />
		</Pressable>
	);
}
