import React, { useMemo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import P from '@Components/Layout/Text/P';

export default function __DisplayDataStatic__(props: {
  gpsData: GPS_DTO
  features: GPSFeaturesDTO
}) {

  const { coordinates, altitude } = props.gpsData;
  const { editMode, gpsON} = props.features;

  const showStaticDisplay =
    (
      coordinates !== undefined ||
      altitude    !== undefined
    )                           &&
    (
      gpsON    === true   ||
      editMode === false
    )
  ;

  return (<>
    {showStaticDisplay && (
      <View>
        {coordinates !== undefined && <>
          <DataInfo
            title="Latitude"
            value={coordinates.lat}
            precision={coordinates.accuracy}
          />
          <DataInfo
            title="Longitude"
            value={coordinates.long}
            precision={coordinates.accuracy}
          />
        </>}
        {altitude !== undefined && <>
          <DataInfo
            title="Altitude"
            value={altitude.value}
            precision={altitude.accuracy}
          />
        </>}
      </View>
    )}
  </>);
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
