import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@Text/index';

type InputTheme = {
  font: string
  background: string
}

export function InputRoot(props: {
  label: string
  theme: InputTheme
  iconButtons: JSX.Element
  children: ReactNode
}) {

  const { theme } = props;

  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingTop: 15,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          paddingLeft: 15,
          zIndex: 1,
        }}
      >
        <Text.Root
          style={{
            backgroundColor: theme.background,
            color: theme.font,
            fontSize: 20,
            paddingHorizontal: 5,
          }}
        >
          {props.label}
        </Text.Root>
      </View>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          backgroundColor: theme.background,
          zIndex: 1,
          height: 30,
          top: 0,
          right: 15,
        }}
      >
        {props.iconButtons}
      </View>
      <View
        style={{
          width: '100%',
          paddingTop: 5,
          paddingHorizontal: 10,
          gap: 10,
          backgroundColor: theme.background,
          borderColor: theme.font,
          borderWidth: 2,
          borderRadius: 10,
        }}
      >
        {props.children}
      </View>
    </View>
  );
}
