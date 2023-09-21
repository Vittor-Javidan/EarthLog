import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import FontService from '@Services/FontService';

import RootText from './Root';

export default function P(props: {
  children: string
  style?: StyleProp<TextStyle>
}) {

  return (
    <RootText
      style={[{
        textAlign: 'justify',
        fontSize: FontService.FONTS.p,
      }, props.style]}
    >
      {props.children}
    </RootText>
  );
}
