import React, { useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { GPSFeaturesDTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';

export default function LoadingFeedback(props: {
  features: GPSFeaturesDTO
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);
  const { gpsON, enableCoordinate, enableAltitude } = props.features;
  const nothingEnable = enableCoordinate === false && enableAltitude === false;

  if (gpsON === false) {
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
      <P
        style={{
          color: theme.onBackground,
          textAlign: 'justify',
        }}
      >
        {nothingEnable
          ? R['Nothing selected']
          : R['Collecting the best data. Updates can take a few seconds...']
        }
      </P>
    </View>
  );
}
