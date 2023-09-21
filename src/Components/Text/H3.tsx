import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import FontService from '@Services/FontService';

import RootText from './Root';

export default function H3(props: {
  children: string
  style?: StyleProp<TextStyle>
}) {

  return (
    <RootText
      style={[{
        textAlign: 'left',
        fontSize: FontService.FONTS.h3,
      }, props.style]}
    >
      {props.children}
    </RootText>
  );
}
