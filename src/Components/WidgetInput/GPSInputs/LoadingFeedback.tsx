import React, { useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { GPSFeaturesDTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Text } from '@Text/index';
import { GPSInputTheme } from './ThemeType';

export default function LoadingFeedback(props: {
  features: GPSFeaturesDTO
  theme: GPSInputTheme
}) {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.Input.GPSInput[config.language], []);

  const nothingEnable =
    props.features.enableCoordinate === false &&
    props.features.enableAltitude   === false
  ;

  if (props.features.gpsON === false) {
    return <></>;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        gap: 10,
      }}
    >
      <ActivityIndicator size="small" />
      <Text.P
        style={{
          color: props.theme.font,
          textAlign: 'justify',
        }}
      >
        {nothingEnable
          ? R['Nothing selected']
          : R['Collecting the best data. Updates can take a few seconds...']
        }
      </Text.P>
    </View>
  );
}
