import React, { useMemo } from 'react';
import { View, Text, StyleProp, TextStyle } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

type Values = { whenTrue: string, whenFalse: string }

export default function Feedback(props: {
  title: string
  assert: boolean
  values: Values
  textStyle_Label?: StyleProp<TextStyle>
  textStyle_Status?: StyleProp<TextStyle>
}) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={[{
          color: theme.onBackground,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }, props.textStyle_Label]}
      >
        {props.title}
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={[{
          color: props.assert ? theme.confirm : theme.modified,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }, props.textStyle_Status]}
      >
        {props.assert ? props.values.whenTrue : props.values.whenFalse}
      </Text>
    </View>
  );
}
