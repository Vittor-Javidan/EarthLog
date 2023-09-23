import React, { useState } from 'react';
import { Text,Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import { Icon, IconName } from '@Icon/index';

type ButtonTheme = {
  font: string
  font_Pressed: string
  background: string
  background_Pressed: string
}

export function RoundedIconButton(props: {
  iconName: IconName
  showPlusSign: boolean
  buttonDiameter: number
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
          maxFontSizeMultiplier={0}
          adjustsFontSizeToFit={true}
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
}
