import React, { ReactNode, memo } from 'react';
import { View } from 'react-native';

import FontService from '@V1/Services/FontService';

import { Text } from '@V1/Text/index';

type InputTheme = {
  font: string
  background: string
}

export const InputRoot = memo((props: {
  label: string
  theme: InputTheme
  iconButtons: JSX.Element
  children: ReactNode
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingTop: 13,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: -2,
          paddingLeft: 15,
          zIndex: 1,
        }}
      >
        <Text
          style={{
            backgroundColor: props.theme.background,
            color: props.theme.font,
            fontFamily: FontService.FONT_FAMILY.h3,
            fontSize: 18,
            paddingHorizontal: 5,
          }}
        >
          {props.label}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          backgroundColor: props.theme.background,
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
          backgroundColor: props.theme.background,
          borderColor: props.theme.font,
          borderWidth: 2,
          borderRadius: 10,
        }}
      >
        {props.children}
      </View>
    </View>
  );
});
