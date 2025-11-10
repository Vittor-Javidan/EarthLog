import React, { memo, useState } from 'react';
import { Pressable, View } from 'react-native';

import DevTools from "@DevTools";
import { GPSFeaturesDTO, GPSInputData, WidgetTheme } from '@V2/Types/ProjectTypes';

import { Icon } from '@V2/Icon/index';
import { Text } from '@V2/Text/index';

export const DataDisplay = memo((props: {
  inputData: GPSInputData
  features: GPSFeaturesDTO
  theme: WidgetTheme
  onMapPress: () => void
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {coordinates !== undefined && <>
            <DataInfo
              title="Latitude"
              value={DevTools.TUTORIAL_MODE ? coordinates.lat + DevTools.TUTORIAL_RANDOM_OFFSET_LATITUDE : coordinates.lat}
              precision={coordinates.accuracy}
              theme={theme}
            />
            <DataInfo
              title="Longitude"
              value={DevTools.TUTORIAL_MODE ? coordinates.long + DevTools.TUTORIAL_RANDOM_OFFSET_LONGITUDE : coordinates.long}
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
        {coordinates !== undefined && (
          <MapButton
            onPress={() => props.onMapPress()}
            theme={theme}
          />
        )}
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

const MapButton = memo((props: {
  onPress: () => void
  theme: WidgetTheme
}) => {

  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        backgroundColor: pressed ? props.theme.confirm : props.theme.font,
        borderRadius: 6,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon
        iconName='google-maps'
        fontSize={40}
        color={pressed ? props.theme.font : props.theme.background}
      />
    </Pressable>
  );
});
