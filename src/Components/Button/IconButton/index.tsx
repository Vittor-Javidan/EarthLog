import React, { useState } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import * as Vibration from 'expo-haptics';

import { Icon, IconName } from '../../Icon';

type ButtonTheme = {
  font: string
  font_Pressed: string
  background: string
  background_Pressed: string
}

export function IconButton(props: {
  iconName: IconName
  theme: ButtonTheme
  style?: StyleProp<ViewStyle>
  onPress: () => void
}) {

  const { theme } = props;
  const [pressed, setPressed] = useState<boolean>(false);

  function onPress() {
    props.onPress();
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  function onPressIn() {
    setPressed(true);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={[{
        flexDirection: 'row',
        backgroundColor: pressed ? theme.background_Pressed : theme.background,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }, props.style]}
    >
      <Icon
        iconName={props.iconName}
        color={pressed ? theme.font_Pressed : theme.font}
      />
    </Pressable>
  );
}
