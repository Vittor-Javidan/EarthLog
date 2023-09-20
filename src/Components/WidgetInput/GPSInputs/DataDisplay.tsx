import React from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPS_DTO } from '@Types/index';

import { Text } from '@Text/index';
import { GPSInputTheme } from './ThemeType';

export default function DataDisplay(props: {
  gpsData: GPS_DTO
  features: GPSFeaturesDTO
  theme: GPSInputTheme
}) {

  const { coordinates, altitude } = props.gpsData;
  const { editMode } = props.features;

  const showStaticDisplay =
    coordinates !== undefined ||
    altitude    !== undefined
  ;

  const showNothing =
    editMode    === false     &&
    coordinates === undefined &&
    altitude    === undefined
  ;

  if (showNothing) {
    return <></>;
  }

  return (<>
    {showStaticDisplay && (
      <View>
        {coordinates !== undefined && <>
          <DataInfo
            title="Latitude"
            value={coordinates.lat}
            precision={coordinates.accuracy}
            theme={props.theme}
          />
          <DataInfo
            title="Longitude"
            value={coordinates.long}
            precision={coordinates.accuracy}
            theme={props.theme}
          />
        </>}
        {altitude !== undefined && <>
          <DataInfo
            title="Altitude"
            value={altitude.value}
            precision={altitude.accuracy}
            theme={props.theme}
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
  theme: GPSInputTheme
}) {

  const { theme } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text.P
        style={{ color: theme.font }}
      >
        {`${props.title}:`}
      </Text.P>
      <Text.P
        style={{ color: theme.font }}
      >
        {`${props.value} (${props.precision}m)`}
      </Text.P>
    </View>
  );
}
