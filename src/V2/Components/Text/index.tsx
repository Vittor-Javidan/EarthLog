import React, { memo } from 'react';
import { Text as ReactNative_Text, StyleProp, TextStyle } from 'react-native';

import FontService from '@V2/Services/FontService';

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
          textAlign:  'left',
          fontFamily: FontService.FONT_FAMILY.h1,
          fontSize:   FontService.FONTS.h1,
          letterSpacing: 0,
          lineHeight: 30,
        },
        props.h2 && {
          textAlign:  'left',
          fontFamily: FontService.FONT_FAMILY.h2,
          fontSize:   FontService.FONTS.h2,
          letterSpacing: 0,
        },
        props.h3 && {
          textAlign:  'left',
          fontFamily: FontService.FONT_FAMILY.h3,
          fontSize:   FontService.FONTS.h3,
          letterSpacing: 0,
        },
        props.p && {
          textAlign: 'justify',
          fontFamily: FontService.FONT_FAMILY.p,
          fontSize:   FontService.FONTS.p,
          letterSpacing: 0,
        },
        props.style,
      ]}
    >
      {props.children}
    </ReactNative_Text>
  );
});
