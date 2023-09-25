import React, { ReactNode, memo } from 'react';
import { ScrollView as ReactNative_ScrollView, StyleProp, ViewStyle } from 'react-native';

export const ScrollView = memo((props: {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  contenContainerStyle?: StyleProp<ViewStyle>
}) => {
  return (
    <ReactNative_ScrollView
      style={props.style}
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={[{
        paddingBottom: 150,
      }, props.contenContainerStyle]}
    >
      {props.children}
    </ReactNative_ScrollView>
  );
});
