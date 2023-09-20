import React, { useState } from 'react';
import { View, TextInput, Platform } from 'react-native';

import { Text } from '@Text/index';
import { GPSInputTheme } from '../ThemeType';

export default function TextInput_GPS(props: {
  title: string
  value: string
  value_placeholder: string
  type: 'latitude' | 'longitude' | 'meters'
  theme: GPSInputTheme
  onChangeText: (value: string) => void
}) {

  const { theme } = props;
  const [value,         setValue        ] = useState<string>(props.value);
  const [invalidValue,  setInvalidValue ] = useState<boolean>(false);

  function onChange(text: string) {

    let regex;
    switch (props.type) {
      case 'latitude':  regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/; break;
      case 'longitude': regex = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([0-9]?\d))(\.\d+)?)$/; break;
      case 'meters': regex = /^[+]?\d+(\.\d{1,2})?$/; break;
    }

    const isValid = regex.test(text) || text === '';
    setValue(text);
    setInvalidValue(!isValid);
    if (isValid) {
      props.onChangeText(text);
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
      <Text.P
        style={{
          color: theme.font,
          textAlign: 'left',
        }}
      >
        {`${props.title}:`}
      </Text.P>
      <TextInput
        style={{
          width: '50%',
          paddingBottom: Platform.OS === 'ios' ? 5 : 0,
          paddingHorizontal: 5,
          color: invalidValue ? theme.wrong : theme.font,
          borderColor: invalidValue ? theme.wrong : theme.font,
          borderBottomWidth: 1,
        }}
        value={value}
        placeholder={props.value_placeholder}
        placeholderTextColor={theme.font_placeholder}
        textAlign="right"
        onChangeText={(text) => onChange(text)}
        keyboardType="decimal-pad"
      />
    </View>
  );
}
