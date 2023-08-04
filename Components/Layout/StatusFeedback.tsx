import React, { useMemo } from 'react';
import { View, Text, StyleProp, TextStyle } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

export default function StatusFeedback(props: {
  saved: boolean
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
        Status
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={[{
          color: props.saved ? theme.confirm : theme.modified,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }, props.textStyle_Status]}
      >
        {props.saved ? 'Saved' : 'Saving'}
      </Text>
    </View>
  );
}
