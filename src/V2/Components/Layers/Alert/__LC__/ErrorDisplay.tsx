import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Text } from '@V2/Text/index';

export const ErrorDisplay = memo((props: {
  showDisplay: boolean
  error: string | null
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
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
          color: theme.font,
        }}
      >
        {RS['Error']}
      </Text>
      <Text p
        style={{
          alignSelf: 'center',
          color: theme.font,
        }}
      >
        {props.error ?? ''}
      </Text>
    </View>
  ) : <></>;
});
