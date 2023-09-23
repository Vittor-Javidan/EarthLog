import React, { useState } from 'react';
import { Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import { Icon, IconName } from '@Icon/index';

type InputTheme = {
  font: string
  background: string
}

export function NavbarIconButton(props: {
  iconName: IconName
  selected?: boolean
  theme: InputTheme
  onPress: () => void
}) {

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
        backgroundColor: (props.selected || pressed) ? props.theme.font : props.theme.background,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 5,
        paddingVertical: 0,
        borderRadius: 10,
      }}
    >
      <Icon
        iconName={props.iconName}
        color={(props.selected || pressed) ? props.theme.background : props.theme.font}
      />
    </Pressable>
  );
}
