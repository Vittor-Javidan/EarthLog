import React from 'react';
import { Text as ReactNative_Text, StyleProp, TextStyle } from 'react-native';

export default function RootText(props: {
  children: string
  style?: StyleProp<TextStyle>
}) {

  return (
    <ReactNative_Text
      maxFontSizeMultiplier={0}
      adjustsFontSizeToFit={true}
      style={props.style}
    >
      {props.children}
    </ReactNative_Text>
  );
}
