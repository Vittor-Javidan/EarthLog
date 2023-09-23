import React, { useState } from 'react';
import { Pressable } from 'react-native';

import ApticsService from '@Services/ApticsService';

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

  const [pressed, setPressed] = useState<boolean>(false);

  function onPress() {
    props.onPress();
    ApticsService.vibrate('success');
  }

  function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
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
        paddingVertical: 5,
        borderTopLeftRadius: props.position === 'bottom right' ? 10 : 0,
        borderTopRightRadius: props.position === 'right' ? 10 : 0,
        borderBottomRightRadius: props.position === 'right' ? 0 : 10,
        borderBottomLeftRadius: props.position === 'bottom right' ? 0 : 10,
      }}
    >
      <Icon
        iconName={props.iconName}
        color={(props.selected || pressed) ? props.theme.background : props.theme.font}
      />
    </Pressable>
  );
}
