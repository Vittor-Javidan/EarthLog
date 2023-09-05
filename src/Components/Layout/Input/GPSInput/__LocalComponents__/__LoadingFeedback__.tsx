import React, { useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';
import { GPSFeaturesDTO } from '@Types/index';

export default function __LoadingFeedback_(props: {
  features: GPSFeaturesDTO
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
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
        gap: 10,
      }}
    >
      <ActivityIndicator size="small" />
      <P
        style={{ color: theme.onBackground }}
      >
        {nothingEnable ? 'Nothing enable' : 'Updates can take a few seconds...'}
      </P>
    </View>
  );
}
