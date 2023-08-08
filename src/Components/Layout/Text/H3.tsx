import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import RootText from './Root';
import ThemeService from '@Services/ThemeService';

export default function H3(props: {
  children: string
  style?: StyleProp<TextStyle>
}) {

  return (
    <RootText
      style={[{
        textAlign: 'left',
        fontSize: ThemeService.FONTS.h3,
      }, props.style]}
    >
      {props.children}
    </RootText>
  );
}
