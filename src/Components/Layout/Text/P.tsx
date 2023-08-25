import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import ThemeService from '@Services/ThemeService';

import RootText from './Root';

export default function P(props: {
  children: string
  style?: StyleProp<TextStyle>
}) {

  return (
    <RootText
      style={[{
        textAlign: 'justify',
        fontSize: ThemeService.FONTS.p,
      }, props.style]}
    >
      {props.children}
    </RootText>
  );
}
