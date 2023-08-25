import React, { useMemo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import ConfigService from '@Services/ConfigService';

import View from '../View';

export default function MessageArea(props: {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={[{
        backgroundColor: theme.primary,
        padding: 10,
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.secondary,
      }]}
    >
      {props.children}
    </View>
  );
}
