import React, { useState } from 'react';
import { Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import { Icon, IconName } from '@Icon/index';

type ButtonTheme = {
  font: string
  background: string
}

export function NavbarIconButton(props: {
  iconName: IconName
  position: 'right' | 'other' | 'bottom right'
  selected?: boolean
  theme: ButtonTheme
  onPress: () => void
}) {

  const { theme, iconName, selected, position } = props;
  const [pressed, setPressed] = useState<boolean>(false);

  function onPress() {
    props.onPress();
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  function onPressIn() {
    setPressed(true);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  function onPressOut() {
    setPressed(false);
  }

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => onPressOut()}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        backgroundColor: (selected || pressed) ? theme.font : theme.background,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderTopLeftRadius: position === 'bottom right' ? 10 : 0,
        borderTopRightRadius: position === 'right' ? 10 : 0,
        borderBottomRightRadius: position === 'right' ? 0 : 10,
        borderBottomLeftRadius: position === 'bottom right' ? 0 : 10,
      }}
    >
      <Icon
        iconName={iconName}
        color={(selected || pressed) ? theme.background : theme.font}
      />
    </Pressable>
  );
}
