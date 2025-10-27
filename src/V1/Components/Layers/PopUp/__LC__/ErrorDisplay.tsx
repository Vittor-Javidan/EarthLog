import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Text } from '@V1/Text/index';

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
