import React, { useState, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import { HapticsService } from '@V1/Services/HapticsService';

import { Icon } from '@V1/Icon/index';

type ButtonTheme = {
  font: string
  background: string
}

export const WidgetDeleteButton = memo((props: {
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
        backgroundColor: pressed ? props.theme.background : props.theme.font,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}
    >
      <Icon
        iconName="trash-outline"
        color={pressed ? props.theme.font : props.theme.background}
        fontSize={30}
      />
    </Pressable>
  );
});
