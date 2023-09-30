import React, { useState, memo, useCallback } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import HapticsService from '@Services/HapticsService';

import { Icon, IconName } from '../../Icon';

type ButtonTheme = {
  font: string
  font_Pressed: string
  background: string
  background_Pressed: string
}

export const IconButton = memo((props: {
  iconName: IconName
  theme: ButtonTheme
  style?: StyleProp<ViewStyle>
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
      style={[{
        flexDirection: 'row',
        backgroundColor: pressed ? props.theme.background_Pressed : props.theme.background,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }, props.style]}
    >
      <Icon
        iconName={props.iconName}
        color={pressed ? props.theme.font_Pressed : props.theme.font}
      />
    </Pressable>
  );
});
