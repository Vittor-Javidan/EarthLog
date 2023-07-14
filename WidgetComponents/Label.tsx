import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import { WidgetLabel } from '@Services/ProjectService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';

export default function Label(props: {
  label: WidgetLabel
  wrongData: boolean
  icons: JSX.Element
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: props.wrongData ? theme.wrong : theme.primary,
        borderColor: theme.secondary,
        borderWidth: 1,
        height: 40,
      }}
    >
      <Text
        maxFontSizeMultiplier={0}
        adjustsFontSizeToFit={true}
        style={{
          width: '50%',
          paddingHorizontal: 10,
          fontSize: ThemeService.FONTS.h3,
          color: props.wrongData ? theme.onWrong : theme.onPrimary,
        }}
      >
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.icons}
      </View>
    </View>
  );
}
