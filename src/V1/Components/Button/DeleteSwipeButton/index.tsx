import React, { useMemo, useState, useEffect, memo } from 'react';
import { View, Dimensions, Animated, PanResponder } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';

import { Icon } from '@V1/Icon/index';
import { Text } from '@V1/Text/index';
import { CancelButton } from './CancelButton';

type ButtonTheme = {
  font: string
  background: string
  confirm: string
  wrong: string
}

export const DeleteSwipeButton = memo((props: {
  buttonRadius?: number
  compensateMargin?: number
  theme: ButtonTheme
  onSwipe: () => void
  onCancel: () => void
}) => {

  const config                                = useMemo(() => ConfigService.config, []);
  const R                                     = useMemo(() => translations.component.button[config.language], []);
  const { width: WIDTH }                      = useMemo(() => Dimensions.get('window'), []);
  const COMPENSATE_MARGIN                     = useMemo(() => props.compensateMargin ?? 0, []);
  const PADDING                               = useMemo(() => 10, []);
  const CIRCLE_RADIUS                         = useMemo(() => props.buttonRadius ?? 35, []);
  const CIRCLE_DIAMETER                       = useMemo(() => CIRCLE_RADIUS * 2, []);
  const THRESHOLD                             = useMemo(() => WIDTH - CIRCLE_DIAMETER - PADDING - PADDING - COMPENSATE_MARGIN - COMPENSATE_MARGIN, []);
  const translateX                            = useMemo(() => new Animated.Value(0), []);
  const panResponder                          = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      HapticsService.vibrate('warning');
    },
    onPanResponderMove: (evt, gestureState) => {
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx >= THRESHOLD) {
        props.onSwipe();
        HapticsService.vibrate('warning');
      } else {
        Animated.timing(translateX, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
    },
  }), [translateX, props.onSwipe]);

  const [isTargetReached, setIsTargetReached] = useState(false);

  useEffect(() => {
    translateX.addListener(({ value }) => {
      setIsTargetReached(value >= THRESHOLD);
    });
    return () => {
      translateX.removeAllListeners();
    };
  }, [translateX]);

  return (
    <GestureHandlerRootView
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

      {/* Swipe Line */}
      <Animated.View
        style={[{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: CIRCLE_DIAMETER,
          width: '100%',
          paddingLeft: 20,
          borderColor: props.theme.font,
          borderRadius: 40,
        }, {
          backgroundColor: translateX.interpolate({
            inputRange:  [-PADDING - COMPENSATE_MARGIN , 0, THRESHOLD, THRESHOLD + PADDING + COMPENSATE_MARGIN],
            outputRange: [props.theme.background, props.theme.background, props.theme.wrong, props.theme.wrong],
            extrapolate: 'clamp',
          }),
        }]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isTargetReached && (
            <Text h3
              style={{
                color: props.theme.background,
              }}
            >
              {R['Release to confirm']}
            </Text>
          )}
        </View>

        {/* Swipe Target */}
        <Animated.View
          style={[{
            height: CIRCLE_DIAMETER,
            width: CIRCLE_DIAMETER,
            borderRadius: CIRCLE_RADIUS,
            borderWidth: 3,
            borderColor: props.theme.background,
            justifyContent: 'center',
            alignItems: 'center',
          }, {
            backgroundColor: translateX.interpolate({
              inputRange:  [-PADDING - COMPENSATE_MARGIN , 0, THRESHOLD, THRESHOLD + PADDING + COMPENSATE_MARGIN],
              outputRange: [props.theme.wrong, props.theme.wrong, props.theme.background, props.theme.background],
              extrapolate: 'clamp',
            }),
          }]}
        >
          <Icon
            iconName="trash-outline"
            color={props.theme.background}
            fontSize={30}
          />
        </Animated.View>

        {/* Swipe button */}
        <Animated.View
          {...panResponder.panHandlers}
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
          }, {
            transform: [{
              translateX: translateX.interpolate({
                inputRange:  [0, WIDTH - (CIRCLE_DIAMETER) - (PADDING * 2) - (COMPENSATE_MARGIN * 2)],
                outputRange: [0, WIDTH - (CIRCLE_DIAMETER) - (PADDING * 2) - (COMPENSATE_MARGIN * 2)],
                extrapolate: 'clamp',
              }),
            }],
          }]}
        >
          <Icon
            iconName="finger-print"
            color={props.theme.background}
            fontSize={30}
          />
        </Animated.View>

      </Animated.View>
    </GestureHandlerRootView>
  );
});
