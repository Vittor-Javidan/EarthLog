import React, { useMemo, useState, memo, useCallback } from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useDerivedValue, useSharedValue, runOnJS, useAnimatedStyle } from 'react-native-reanimated';

import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import FontService from '@V1/Services/FontService';

import { Icon } from '@V1/Icon/index';
import { Text } from '@V1/Text/index';

type ButtonTheme = {
  font: string
  background: string
  confirm: string
  wrong: string
}

export const DeleteSwipeButton = (props: {
  buttonRadius?: number
  compensateMargin?: number
  theme: ButtonTheme
  onSwipe: () => void
  onCancel: () => void
}) => {

  const { width: WIDTH } = useMemo(() => Dimensions.get('window'), []);
  const config           = useMemo(() => ConfigService.config, []);
  const R                = useMemo(() => translations.component.button[config.language], []);

  const COMPENSATE_MARGIN = props.compensateMargin ?? 0;
  const PADDING           = 10;
  const CIRCLE_RADIUS     = props.buttonRadius ?? 35;
  const CIRCLE_DIAMETER   = CIRCLE_RADIUS * 2;
  const THRESHOLD         = WIDTH - CIRCLE_DIAMETER - PADDING - PADDING - 10 - COMPENSATE_MARGIN - COMPENSATE_MARGIN;

  const translateX         = useSharedValue(0);
  const adjustedTranslateX = useDerivedValue(() => Math.min(
    Math.max(translateX.value, 0),
    WIDTH - (CIRCLE_DIAMETER) - (PADDING * 2) - (COMPENSATE_MARGIN * 2),
  ));

  const animatedStyle_circle     = useAnimatedStyle(() => ({
    transform: [{ translateX: adjustedTranslateX.value }],
  }));
  const animatedStyle_slider     = useAnimatedStyle(() => ({
    backgroundColor: translateX.value < THRESHOLD ? props.theme.background : props.theme.wrong,
  }));
  const animatedStyle_targetArea = useAnimatedStyle(() => ({
    backgroundColor: translateX.value < THRESHOLD ? props.theme.wrong : props.theme.background,
  }));

  const vibrate = useCallback(() => {
    HapticsService.vibrate('warning');
  }, []);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number }>({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value;
      runOnJS(vibrate)();
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      'worklet';
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
        theme={props.theme}
      />
      <Animated.View
        style={[{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: CIRCLE_DIAMETER,
          width: '100%',
          paddingLeft: 20,
          backgroundColor: props.theme.background,
          borderColor: props.theme.font,
          borderRadius: 40,
        }, animatedStyle_slider]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text h3
            style={{
              color: props.theme.background,
            }}
          >
            {R['Release to confirm']}
          </Text>
        </View>
        <Animated.View
          style={[{
            height: CIRCLE_DIAMETER,
            width: CIRCLE_DIAMETER,
            borderRadius: CIRCLE_RADIUS,
            borderWidth: 3,
            borderColor: props.theme.background,
            backgroundColor: props.theme.wrong,
            justifyContent: 'center',
            alignItems: 'center',
          }, animatedStyle_targetArea]}
        >
          <Icon
            iconName="trash-outline"
            color={props.theme.background}
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
              borderColor: props.theme.background,
              backgroundColor: props.theme.confirm,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 20,
            }, animatedStyle_circle]}
          >
            <Icon
              iconName="finger-print"
              color={props.theme.background}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
};

const CancelButton = memo((props: {
  theme: ButtonTheme
	onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.component.button[config.language], []);
  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

	return (
		<Pressable
			onPressIn={() => onPressIn()}
			onPressOut={() => setPressed(false)}
			onPress={() => onPress()}
			style={{
				backgroundColor: pressed ? props.theme.font : props.theme.background,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        height: 30,
        borderRadius: 15,
        paddingVertical: 0,
				paddingLeft: 10,
        paddingRight: 6,
			}}
		>
      <Text
				style={{
          fontFamily: FontService.FONT_FAMILY.p,
					fontSize: 200,
          color: pressed ? props.theme.background : props.theme.font,
          paddingVertical: 5,
				}}
			>
				{R['Cancel']}
			</Text>
      <Icon
        iconName="close"
        color={pressed ? props.theme.background : props.theme.font}
      />
		</Pressable>
	);
});
