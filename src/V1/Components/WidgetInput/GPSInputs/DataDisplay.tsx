import React, { memo } from 'react';
import { View } from 'react-native';

import { GPSFeaturesDTO, GPSInputData, WidgetTheme } from '@V1/Types/ProjectTypes';
import { gpsTutorialCoodinateMask } from '@V1/Globals/GPSTutorial';

import { Text } from '@V1/Text/index';

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

  /*
    Tutorial Mode
    This is a simple way to hide my real GPS data while I'm recording tutorial videos
    It adds a small random number to the latitude, longitude and altitude values.

    NEVER COMMIT WITH TUTORIAL MODE ENABLED!!!!!!
  */
  const random = gpsTutorialCoodinateMask();
  const TUTORIAL_MODE = false;
  // ================================================================================

  return (<>
    {showStaticDisplay && (
      <View>
        {coordinates !== undefined && <>
          <DataInfo
            title="Latitude"
            value={TUTORIAL_MODE ? coordinates.lat + random : coordinates.lat}
            precision={coordinates.accuracy}
            theme={theme}
          />
          <DataInfo
            title="Longitude"
            value={TUTORIAL_MODE ? coordinates.long + random : coordinates.long}
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
