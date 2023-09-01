import React, { useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';

import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';

export default function __LoadingFeedback_(props: {
  gpsON: boolean
  coordinateEnable: boolean
  altitudeEnable: boolean
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const nothingEnable = props.coordinateEnable === false && props.altitudeEnable === false;

  if (props.gpsON === false || nothingEnable) {
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
        Updates can take a few seconds...
      </P>
    </View>
  );
}
