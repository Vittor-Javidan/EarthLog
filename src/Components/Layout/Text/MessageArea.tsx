import React, { useMemo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import View from '../View';
import ConfigService from '@Services/ConfigService';

export default function MessageArea(props: {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

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
