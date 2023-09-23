import React from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPS_DTO } from '@Types/ProjectTypes';

import { Text } from '@Text/index';
import { GPSInputTheme } from './ThemeType';

export default function DataDisplay(props: {
  gpsData: GPS_DTO
  features: GPSFeaturesDTO
  theme: GPSInputTheme
}) {

  const showStaticDisplay =
    props.gpsData.coordinates !== undefined ||
    props.gpsData.altitude    !== undefined
  ;

  const showNothing =
    props.features.editMode   === false     &&
    props.gpsData.coordinates === undefined &&
    props.gpsData.altitude    === undefined
  ;

  if (showNothing) {
    return <></>;
  }

  return (<>
    {showStaticDisplay && (
      <View>
        {props.gpsData.coordinates !== undefined && <>
          <DataInfo
            title="Latitude"
            value={props.gpsData.coordinates.lat}
            precision={props.gpsData.coordinates.accuracy}
            theme={props.theme}
          />
          <DataInfo
            title="Longitude"
            value={props.gpsData.coordinates.long}
            precision={props.gpsData.coordinates.accuracy}
            theme={props.theme}
          />
        </>}
        {props.gpsData.altitude !== undefined && <>
          <DataInfo
            title="Altitude"
            value={props.gpsData.altitude.value}
            precision={props.gpsData.altitude.accuracy}
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
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text.P
        style={{ color: props.theme.font }}
      >
        {`${props.title}:`}
      </Text.P>
      <Text.P
        style={{ color: props.theme.font }}
      >
        {`${props.value} (${props.precision}m)`}
      </Text.P>
    </View>
  );
}
