import React, { ReactNode } from 'react';
import { ScrollView as ReactNative_ScrollView, StyleProp, ViewStyle } from 'react-native';

export default function ScrollView(props: {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  contenContainerStyle?: StyleProp<ViewStyle>
}) {
  return (
    <ReactNative_ScrollView
      style={props.style}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={[{
        gap: 5,
        padding: 5,
      }, props.contenContainerStyle]}
    >
      {props.children}
    </ReactNative_ScrollView>
  );
}
