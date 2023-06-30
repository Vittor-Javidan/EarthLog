import React, { ReactNode } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

export default function Layout_ScrollView(props: {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}) {
  return (
    <ScrollView
      style={props.style}
      contentContainerStyle={{
        gap: 10,
        padding: 10,
      }}
    >
      {props.children}
    </ScrollView>
  );
}
