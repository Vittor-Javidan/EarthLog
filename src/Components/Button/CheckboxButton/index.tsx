import React from 'react';
import { View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type ButtonTheme = {
  font: string
  background: string
  confirm: string
}

export function Checkbox(props: {
  value: boolean
  theme: ButtonTheme
  onChange: (checked: boolean) => void
}) {
  return (
    <View
      style={{ flexDirection: 'row' }}
    >
      <Pressable
        onPress={() => props.onChange(!props.value)}
        style={{
          backgroundColor: props.value ? props.theme.confirm : props.theme.font,
          justifyContent: 'center',
          alignItems: 'center',
          height: 25,
          width: 25,
          borderRadius: 6,
          opacity: 1,
        }}
      >
        {props.value && <Ionicons
          name="checkmark-sharp"
          adjustsFontSizeToFit={true}
          maxFontSizeMultiplier={0}
          style={{
            color: props.theme.background,
            fontSize: 200,
          }}
        />}
      </Pressable>
    </View>
  );
}
