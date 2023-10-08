import React, { memo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPSInputData, WidgetTheme } from '@Types/ProjectTypes';

import { Text } from '@Text/index';

export const DataDisplay = memo((props: {
  inputData: GPSInputData
  features: GPSFeaturesDTO
  theme: WidgetTheme
}) => {

  const showStaticDisplay =
    props.inputData.value.coordinates !== undefined ||
    props.inputData.value.altitude    !== undefined
  ;

  const showNothing =
    props.features.editMode   === false     &&
    props.inputData.value.coordinates === undefined &&
    props.inputData.value.altitude    === undefined
  ;

  if (showNothing) {
    return <></>;
  }

  return (<>
    {showStaticDisplay && (
      <View>
        {props.inputData.value.coordinates !== undefined && <>
          <DataInfo
            title="Latitude"
            value={props.inputData.value.coordinates.lat}
            precision={props.inputData.value.coordinates.accuracy}
            theme={props.theme}
          />
          <DataInfo
            title="Longitude"
            value={props.inputData.value.coordinates.long}
            precision={props.inputData.value.coordinates.accuracy}
            theme={props.theme}
          />
        </>}
        {props.inputData.value.altitude !== undefined && <>
          <DataInfo
            title="Altitude"
            value={props.inputData.value.altitude.value}
            precision={props.inputData.value.altitude.accuracy}
            theme={props.theme}
          />
        </>}
      </View>
    )}
  </>);
});

const DataInfo = memo((props: {
  title: string
  value: number
  precision: number
  theme: WidgetTheme
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text p
        style={{ color: props.theme.font }}
      >
        {`${props.title}:`}
      </Text>
      <Text p
        style={{ color: props.theme.font }}
      >
        {`${props.value} (${props.precision}m)`}
      </Text>
    </View>
  );
});
