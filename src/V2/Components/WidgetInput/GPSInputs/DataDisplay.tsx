import React, { memo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPSInputData, WidgetTheme } from '@V2/Types/ProjectTypes';

import { Text } from '@V2/Text/index';

export const DataDisplay = memo((props: {
  inputData: GPSInputData
  features: GPSFeaturesDTO
  theme: WidgetTheme
}) => {

  const { inputData, features, theme } = props;
  const { coordinates, altitude } = inputData.value;

  const showStaticDisplay =
    coordinates !== undefined ||
    altitude    !== undefined
  ;

  const showNothing =
    features.editMode === false     &&
    coordinates       === undefined &&
    altitude          === undefined
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
            theme={theme}
          />
          <DataInfo
            title="Longitude"
            value={coordinates.long}
            precision={coordinates.accuracy}
            theme={theme}
          />
        </>}
        {altitude !== undefined && <>
          <DataInfo
            title="Altitude"
            value={altitude.value}
            precision={altitude.accuracy}
            theme={theme}
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
