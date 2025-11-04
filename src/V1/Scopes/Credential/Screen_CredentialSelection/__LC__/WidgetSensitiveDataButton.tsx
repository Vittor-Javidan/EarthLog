import React, { useState, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { HapticsService } from '@V1/Services/HapticsService';

import { Icon } from '@V1/Icon/index';

type ButtonTheme = {
  font: string
  background: string
}

export const WidgetSensitiveDataButton = memo((props: {
  showSensitiveInfo: boolean
  theme: ButtonTheme
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        backgroundColor: pressed ? props.theme.font : props.theme.background,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <Icon
        iconName={props.showSensitiveInfo ? 'eye' : 'eye-off'}
        color={pressed ? props.theme.background : props.theme.font}
        fontSize={30}
      />
    </Pressable>
  );
});
