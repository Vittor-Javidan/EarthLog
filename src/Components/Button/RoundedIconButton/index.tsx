import React, { useState, memo } from 'react';
import { Pressable } from 'react-native';

import ApticsService from '@Services/ApticsService';

import { Icon, IconName } from '@Icon/index';
import { Text } from '@Text/index';

type ButtonTheme = {
  font: string
  font_Pressed: string
  background: string
  background_Pressed: string
}

export const RoundedIconButton = memo((props: {
  iconName: IconName
  showPlusSign: boolean
  buttonDiameter: number
  theme: ButtonTheme
  onPress: () => void
}) => {

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
  }

  function onPress() {
    props.onPress();
    ApticsService.vibrate('success');
  }

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? props.theme.background_Pressed : props.theme.background,
        borderColor: props.theme.background_Pressed,
        height: props.buttonDiameter,
        width: props.buttonDiameter,
        borderRadius: props.buttonDiameter,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 3,
      }}
    >
      {props.showPlusSign && (
        <Text
          style={{
            color: pressed ? props.theme.font_Pressed : props.theme.font,
            fontSize: 25,
          }}
        >
          +
        </Text>
      )}
      <Icon
        iconName={props.iconName}
        color={pressed ? props.theme.font_Pressed : props.theme.font}
      />
    </Pressable>
  );
});
