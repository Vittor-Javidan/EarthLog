import React, { useMemo, useState } from 'react';
import { View, TextInput, Platform } from 'react-native';

import { AltitudeDTO, CoordinateDTO, GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import H3 from '@Components/Layout/Text/H3';

export default function __DisplayDataInterative__(props: {
  gpsData: GPS_DTO
  features: GPSFeaturesDTO
  onError: () => void
  onChange_gpsData: (gpsData: GPS_DTO) => void
}) {

  const { editMode, gpsON, enableCoordinate, enableAltitude } = props.features;

  const showInterativeDisplay =
    (
      enableCoordinate  === true  ||
      enableAltitude    === true
    )                             &&
    editMode  === true  &&
    gpsON     === false
  ;

  function onChange_Latitude(newLatitude: number) {
    const newCoordinateDTO: CoordinateDTO = {
      lat: newLatitude,
      long: props.gpsData.coordinates?.long ?? 0,
      accuracy: props.gpsData.coordinates?.accuracy ?? 999,
    };
    const newGPSData: GPS_DTO = { ...props.gpsData };
    newGPSData.coordinates = newCoordinateDTO;
    props.onChange_gpsData(newGPSData);
  }

  function onChange_Longitude(newLongitude: number) {
    const newCoordinateDTO: CoordinateDTO = {
      lat: props.gpsData.coordinates?.lat ?? 0,
      long: newLongitude,
      accuracy: props.gpsData.coordinates?.accuracy ?? 999,
    };
    const newGPSData: GPS_DTO = { ...props.gpsData };
    newGPSData.coordinates = newCoordinateDTO;
    props.onChange_gpsData(newGPSData);
  }

  function onChange_CoordinateAcc(newAccuracy:  number) {
    const newCoordinateDTO: CoordinateDTO = {
      lat: props.gpsData.coordinates?.lat ?? 0,
      long: props.gpsData.coordinates?.long ?? 0,
      accuracy: newAccuracy,
    };
    const newGPSData: GPS_DTO = { ...props.gpsData };
    newGPSData.coordinates = newCoordinateDTO;
    props.onChange_gpsData(newGPSData);
  }

  function onChange_Altitude(newAltitude: number) {
    const newAltitudeDTO: AltitudeDTO = {
      value: newAltitude,
      accuracy: props.gpsData.altitude?.accuracy ?? 999,
    };
    const newGPSData: GPS_DTO = { ...props.gpsData };
    newGPSData.altitude = newAltitudeDTO;
    props.onChange_gpsData(newGPSData);
  }

  function onChange_AltitudeAcc(newAccuracy: number) {
    const newAltitudeDTO: AltitudeDTO = {
      value: props.gpsData.altitude?.value ?? 0,
      accuracy: newAccuracy,
    };
    const newGPSData: GPS_DTO = { ...props.gpsData };
    newGPSData.altitude = newAltitudeDTO;
    props.onChange_gpsData(newGPSData);
  }

  return (<>
    {showInterativeDisplay && (
      <View
        style={{
          gap: 20,
        }}
      >
        {enableCoordinate && (
          <View>
            <DataInfo_TextInput
              type="latitude"
              title="Latitude (DD)"
              value_placeholder="Latitude"
              value={props.gpsData.coordinates?.lat}
              onChangeNumber={(newLat) => onChange_Latitude(newLat)}
              onError={() => props.onError()}
            />
            <DataInfo_TextInput
              type="longitude"
              title="Longitude (DD)"
              value_placeholder="Longitude"
              value={props.gpsData.coordinates?.long}
              onChangeNumber={(newLong) => onChange_Longitude(newLong)}
              onError={() => props.onError()}
            />
            <DataInfo_TextInput
              type="meters"
              title="Accuracy (m)"
              value_placeholder="Accuracy"
              value={props.gpsData.coordinates?.accuracy}
              onChangeNumber={(newAcc) => onChange_CoordinateAcc(newAcc)}
              onError={() => props.onError()}
            />
          </View>
        )}
        {enableAltitude && (
          <View>
            <DataInfo_TextInput
              type="meters"
              title="Altitude (m)"
              value_placeholder="Altitude"
              value={props.gpsData.altitude?.value}
              onChangeNumber={(newAlt) => onChange_Altitude(newAlt)}
              onError={() => props.onError()}
            />
            <DataInfo_TextInput
              type="meters"
              title="Accuracy (m)"
              value_placeholder="Accuracy"
              value={props.gpsData.altitude?.accuracy}
              onChangeNumber={(newAcc) => onChange_AltitudeAcc(newAcc)}
              onError={() => props.onError()}
            />
          </View>
        )}
      </View>
    )}
  </>);
}

function DataInfo_TextInput(props: {
  title: string
  value: number | undefined
  value_placeholder: string
  type: 'latitude' | 'longitude' | 'meters'
  onChangeNumber: (value: number) => void
  onError: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  const [value, setValue] = useState<string>(String(props.value ?? ''));
  const [wrongFormat, setWrongFormat] = useState<boolean>(false);

  function onChange(text: string) {

    let regex;
    switch (props.type) {
      case 'latitude':  regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/; break;
      case 'longitude': regex = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([0-9]?\d))(\.\d+)?)$/; break;
      case 'meters': regex = /^[+]?\d+(\.\d{1,2})?$/; break;
    }

    if (regex.test(text)) {
      setValue(text);
      setWrongFormat(false);
      props.onChangeNumber(Number(text));
    } else {
      setValue(text);
      setWrongFormat(true);
      props.onError();
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <H3
        style={{
          color: theme.onBackground,
          textAlign: 'left',
        }}
      >
        {`${props.title}:`}
      </H3>
      <TextInput
        style={{
          width: '50%',
          paddingBottom: Platform.OS === 'ios' ? 10 : 0,
          paddingHorizontal: 5,
          color: wrongFormat ? theme.wrong : theme.onBackground,
          borderColor: wrongFormat ? theme.wrong : theme.secondary,
          borderBottomWidth: 1,
        }}
        value={value}
        placeholder={props.value_placeholder}
        placeholderTextColor={theme.onTertiary_Placeholder}
        textAlign="right"
        onChangeText={(text) => onChange(text)}
        keyboardType="decimal-pad"
      />
    </View>
  );
}
