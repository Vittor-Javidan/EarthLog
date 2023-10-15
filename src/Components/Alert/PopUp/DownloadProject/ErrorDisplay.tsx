import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';

export const ErrorDisplay = memo((props: {
  showDisplay: boolean
  error: string | null
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const RS     = useMemo(() => translations.component.alert.shared[config.language], []);

  return props.showDisplay ? (
    <View
      style={{
        paddingHorizontal: 10,
        gap: 10,
      }}
    >
      <Text h3
        style={{
          alignSelf: 'center',
        }}
      >
        {RS['Error']}
      </Text>
      <Text p
        style={{
          alignSelf: 'center',
        }}
      >
        {props.error ?? ''}
      </Text>
    </View>
  ) : <></>;
});
