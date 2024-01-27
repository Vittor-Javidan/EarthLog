import React, { memo } from 'react';
import { Pressable } from 'react-native';

type ButtonTheme = {
  font: string
  background: string
  confirm: string
}

export const Bullet = memo((props: {
  value: boolean
  theme: ButtonTheme
  onChange: (checked: boolean) => void
}) => {
  return (
    <Pressable
      onPress={() => props.onChange(!props.value)}
      style={{
        backgroundColor: props.value ? props.theme.confirm : props.theme.background,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderRadius: 25,
        borderWidth: props.value ? 7 : 2,
        borderColor: props.theme.font,
      }}
    />
  );
});
