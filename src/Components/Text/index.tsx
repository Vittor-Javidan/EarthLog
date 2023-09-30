import React, { memo } from 'react';
import { Text as ReactNative_Text, StyleProp, TextStyle } from 'react-native';

import FontService from '@Services/FontService';

export const Text = memo((props: {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  p?: boolean
  numberOfLine?: number
  children: string
  style?: StyleProp<TextStyle>
}) => {

  return (
    <ReactNative_Text
      maxFontSizeMultiplier={0}
      adjustsFontSizeToFit={true}
      numberOfLines={props.numberOfLine}
      style={[
        props.h1 && {
          textAlign: 'left',
          fontWeight: '700',
          fontSize: FontService.FONTS.h1,
        },
        props.h2 && {
          textAlign: 'left',
          fontWeight: '500',
          fontSize: FontService.FONTS.h2,
        },
        props.h3 && {
          textAlign: 'left',
          fontSize: FontService.FONTS.h3,
        },
        props.p && {
          textAlign: 'justify',
          fontSize: FontService.FONTS.p,
        },
        props.style,
      ]}
    >
      {props.children}
    </ReactNative_Text>
  );
});
