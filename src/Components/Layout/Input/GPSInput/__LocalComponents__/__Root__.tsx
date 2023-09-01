import React, { useMemo, ReactNode } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';

import RootText from '@Components/Layout/Text/Root';

export default function __Root__(props: {
  label?: string
  backgroundColor?: string
  color?: string
  color_placeholder?: string
  iconButtons?: JSX.Element
  children?: ReactNode
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const backgroundColor = props.backgroundColor ?? theme.background;
  const color = props.color ?? theme.onBackground;

  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingTop: 15,
      }}
    >
      {(props.label !== undefined && props.label !== '') && (<RootText
        style={{
          position: 'absolute',
          backgroundColor: backgroundColor,
          color: color,
          fontSize: 20,
          paddingHorizontal: 5,
          top: 0,
          left: 15,
          zIndex: 1,
        }}
      >
        {props.label}
      </RootText>)}
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          backgroundColor: backgroundColor,
          zIndex: 1,
          height: 30,
          top: 0,
          right: 15,
        }}
      >
        {props.iconButtons}
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 10,
          gap: 10,
          backgroundColor: backgroundColor,
          borderColor: theme.primary,
          borderWidth: 2,
          borderRadius: 10,
        }}
      >
        {props.children}
      </View>
    </View>
  );
}
