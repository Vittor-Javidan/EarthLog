import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import FontService from '@Services/FontService';

import RootText from './Root';

export default function H1(props: {
  children: string
  style?: StyleProp<TextStyle>
}) {

  return (
    <RootText
      style={[{
        textAlign: 'left',
        fontWeight: '900',
        fontSize: FontService.FONTS.h1,
      }, props.style]}
    >
      {props.children}
    </RootText>
  );
}
