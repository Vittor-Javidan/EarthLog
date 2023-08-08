import React, { ReactNode } from 'react';
import View from '../View';

export default function MessageArea(props: {
  color_background: string
  color_border: string
  children: ReactNode
}) {
  return (
    <View
      style={{
        backgroundColor: props.color_background,
        padding: 10,
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: props.color_border,
      }}
    >
      {props.children}
    </View>
  );
}
