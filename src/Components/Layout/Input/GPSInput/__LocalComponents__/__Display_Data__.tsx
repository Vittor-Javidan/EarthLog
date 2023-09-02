import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPS_DTO } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';

export default function __Display_Data__(props: {
  gpsData: GPS_DTO
}) {

  const isNoData = props.gpsData.coordinates === undefined && props.gpsData.altitude === undefined;

  if (isNoData) {
    return <></>;
  }

  return (
    <View>
      {props.gpsData.coordinates !== undefined && <>
        <DataInfo
          title="Latitude"
          value={props.gpsData.coordinates.lat}
          precision={props.gpsData.coordinates.accuracy}
        />
        <DataInfo
          title="Longitude"
          value={props.gpsData.coordinates.long}
          precision={props.gpsData.coordinates.accuracy}
        />
      </>}
      {props.gpsData.altitude !== undefined && <>
        <DataInfo
          title="Altitude"
          value={props.gpsData.altitude.value}
          precision={props.gpsData.altitude.accuracy}
        />
      </>}
    </View>
  );
}

function DataInfo(props: {
  title: string
  value: number
  precision: number
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <P
        style={{ color: theme.onBackground }}
      >
        {`${props.title}:`}
      </P>
      <P
        style={{ color: theme.onBackground }}
      >
        {`${props.value} (${props.precision}m)`}
      </P>
    </View>
  );
}
