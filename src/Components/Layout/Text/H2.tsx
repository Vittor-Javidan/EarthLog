import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import RootText from './Root';
import ThemeService from '@Services/ThemeService';

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
