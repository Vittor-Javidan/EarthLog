import React, { useMemo } from 'react';
import { Text as ReactNativeView } from 'react-native';

import { ThemeDTO } from '@Types/index';

import ConfigService from '@Services/ConfigService';

export default function Text(props: {
  children: string
  fontSize: number
  color: keyof ThemeDTO
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <ReactNativeView
      maxFontSizeMultiplier={0}
      adjustsFontSizeToFit={true}
      style={{
        color: theme[props.color],
        fontSize: props.fontSize,
      }}
    >
      {props.children}
    </ReactNativeView>
  );
}
