import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import ThemeService from '@Services/ThemeService';

import RootText from './Root';

export default function H2(props: {
  children: string
  style?: StyleProp<TextStyle>
}) {

  return (
    <RootText
      style={[{
        textAlign: 'left',
        fontWeight: '500',
        fontSize: ThemeService.FONTS.h2,
      }, props.style]}
    >
      {props.children}
    </RootText>
  );
}
