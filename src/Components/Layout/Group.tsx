import React, { useMemo, ReactNode } from 'react';
import View from './View';
import Icon, { IconName } from './Icon';
import { Text } from './Text';

import ConfigService from '@Services/ConfigService';

export default function Group(props: {
  title: string
  icon: IconName
  children: ReactNode
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        alignItems: 'flex-start',
        marginHorizontal: 5,
        backgroundColor: theme.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingBottom: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 5,
          height: 40,
        }}
      >
        <Icon
          iconName={props.icon}
        />
        <Text.H1
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 200,
            color: theme.onPrimary,
          }}
        >
          {props.title}
        </Text.H1>
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          width: '100%',
          padding: 2,
        }}
      >
        {props.children}
      </View>
    </View>
  );
}
