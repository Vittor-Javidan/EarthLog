import React, { useMemo, useState } from 'react';
import { View, TextInput, Platform } from 'react-native';

import { GPSFeaturesDTO, GPS_DTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Button } from '@Components/Layout/Button';
import P from '@Components/Layout/Text/P';

export default function __ManualInput__(props: {
  features: GPSFeaturesDTO
  onConfirm: (gpsData: GPS_DTO) => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Input.GPSInput[language], []);
  const { enableCoordinate, enableAltitude } = props.features;
  const [error, setError] = useState<string>('');

  const [showInput, setShowInput] = useState<boolean>(false);
  const [tempCoordinate, setTempCoordinate] = useState({
    latitude: '',
    longitude: '',
    accuracy: '',
  });
  const [tempAltitude, setTempAltitude] = useState({
    value: '',
    accuracy: '',
  });

  function onCancel() {
    setShowInput(false);
    setError('');
  }

  function onSave() {

    if (missingInfo()) {
      return;
    }

    const newGPSData: GPS_DTO = {};

    if (enableCoordinate) {
      newGPSData.coordinates = {
        lat: Number(tempCoordinate.latitude),
        long: Number(tempCoordinate.longitude),
        accuracy: Number(tempCoordinate.accuracy),
      };
    }

    if (enableAltitude) {
      newGPSData.altitude = {
        value: Number(tempAltitude.value),
        accuracy: Number(tempAltitude.accuracy),
      };
    }

    setShowInput(false);
    setError('');
    props.onConfirm(newGPSData);
  }

  function missingInfo() {

    if (
      enableCoordinate  && (
        tempCoordinate.latitude === ''  ||
        tempCoordinate.longitude === '' ||
        tempCoordinate.accuracy === ''
      )
    ) {
      setError(stringResources['* All fields must be fulfill']);
      return true;
    }

    if (
      enableAltitude  && (
        tempAltitude.value === ''     ||
        tempAltitude.accuracy === ''
      )
    ) {
      setError(stringResources['* All fields must be fulfill']);
      return true;
    }

    return false;
  }

  return (
    <View
      style={{
        borderRadius: 10,
        paddingBottom: showInput ? 10 : 0,
        gap: 10,
        borderWidth: showInput ? 1 : 0,
        borderColor: error !== '' ? theme.wrong : theme.onTertiary,
      }}
    >
      {!showInput && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button.TextWithIcon
            title={stringResources['Manual']}
            iconSide="Right"
            iconName="pencil-sharp"
            color_background={theme.secondary}
            color_font={theme.onSecondary}
            onPress={() => setShowInput(true)}
            style={{
              height: 40,
              paddingVertical: 5,
              borderRadius: 10,
            }}
          />
        </View>
      )}
      {showInput && (<>
        {error !== '' && (
          <P
            style={{
              color: theme.wrong,
              textAlign: 'left',
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            {error}
          </P>
        )}
        <View
          style={{
            gap: 30,
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
        >
          {enableCoordinate && (
            <View
              style={{
                gap: Platform.OS === 'ios' ? 10 : 0,
              }}
            >
              <DataInfo_TextInput
                type="latitude"
                title={stringResources['Latitude (DD)']}
                value_placeholder={stringResources['Latitude']}
                value={tempCoordinate.latitude}
                onChangeText={(newLat) => setTempCoordinate(prev => ({ ...prev, latitude: newLat }))}
                onError={() => {}}
              />
              <DataInfo_TextInput
                type="longitude"
                title={stringResources['Longitude (DD)']}
                value_placeholder={stringResources['Longitude']}
                value={tempCoordinate.longitude}
                onChangeText={(newLong) => setTempCoordinate(prev => ({ ...prev, longitude: newLong }))}
                onError={() => {}}
              />
              <DataInfo_TextInput
                type="meters"
                title={stringResources['Accuracy (m)']}
                value_placeholder={stringResources['Accuracy']}
                value={tempCoordinate.accuracy}
                onChangeText={(newAcc) => setTempCoordinate(prev => ({ ...prev, accuracy: newAcc }))}
                onError={() => {}}
              />
            </View>
          )}
          {enableAltitude && (
            <View
              style={{
                gap: Platform.OS === 'ios' ? 10 : 0,
              }}
            >
              <DataInfo_TextInput
                type="meters"
                title={stringResources['Altitude (m)']}
                value_placeholder={stringResources['Altitude']}
                value={tempAltitude.value}
                onChangeText={(newAlt) => setTempAltitude(prev => ({ ...prev, value: newAlt }))}
                onError={() => {}}
              />
              <DataInfo_TextInput
                type="meters"
                title={stringResources['Accuracy (m)']}
                value_placeholder={stringResources['Accuracy']}
                value={tempAltitude.accuracy}
                onChangeText={(newAcc) => setTempAltitude(prev => ({ ...prev, accuracy: newAcc }))}
                onError={() => {}}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <Button.Icon
              iconName="close"
              color_background={theme.wrong}
              onPress={() => onCancel()}
              style={{
                height: 40,
                flex: 1,
                justifyContent: 'center',
                paddingVertical: 0,
                borderRadius: 10,
              }}
            />
            <Button.Icon
              iconName="save"
              color_background={theme.confirm}
              onPress={() => onSave()}
              style={{
                height: 40,
                flex: 1,
                justifyContent: 'center',
                paddingVertical: 5,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </>)}
    </View>
  );
}

function DataInfo_TextInput(props: {
  title: string
  value: string
  value_placeholder: string
  type: 'latitude' | 'longitude' | 'meters'
  onChangeText: (value: string) => void
  onError: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  const [value, setValue] = useState<string>(props.value);
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
      props.onChangeText(text);
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
      <P
        style={{
          color: theme.onBackground,
          textAlign: 'left',
        }}
      >
        {`${props.title}:`}
      </P>
      <TextInput
        style={{
          width: '50%',
          paddingBottom: Platform.OS === 'ios' ? 5 : 0,
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
