import React, { useState, memo, useCallback } from 'react';
import { View, TextInput } from 'react-native';

import { WidgetTheme } from '@V1/Types/ProjectTypes';
import { FontService } from '@V1/Services_Core/FontService';

import { Text } from '@V1/Text/index';

export const TextInput_GPS = memo((props: {
  title: string
  value: string
  value_placeholder: string
  type: 'latitude' | 'longitude' | 'meters'
  theme: WidgetTheme
  onChangeText: (value: string) => void
}) => {

  const [value,         setValue        ] = useState<string>(props.value);
  const [invalidValue,  setInvalidValue ] = useState<boolean>(false);

  const onChange = useCallback((text: string) => {

    if (text.includes(',')) {
      text = text.replace(',', '.');
    }

    let regex;
    switch (props.type) {
      case 'latitude':  regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/; break;
      case 'longitude': regex = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([0-9]?\d))(\.\d+)?)$/; break;
      case 'meters':    regex = /^[+]?\d+(\.\d{1,2})?$/; break;
    }

    const isValid = regex.test(text) || text === '';
    setValue(text);
    setInvalidValue(!isValid);
    if (isValid) {
      props.onChangeText(text);
    }
  }, [props.value, props.type, props.onChangeText]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
    >
      <Text p
        style={{
          color: props.theme.font,
          textAlign: 'left',
        }}
      >
        {`${props.title}:`}
      </Text>
      <TextInput
        style={{
          width: '50%',
          paddingBottom: 0,
          paddingHorizontal: 5,
          color: invalidValue ? props.theme.wrong : props.theme.font,
          borderColor: invalidValue ? props.theme.wrong : props.theme.font,
          borderBottomWidth: 1,
          fontFamily: FontService.FONT_FAMILY.p,
        }}
        value={value}
        placeholder={props.value_placeholder}
        placeholderTextColor={props.theme.font_placeholder}
        textAlign="right"
        onChangeText={(text) => onChange(text)}
        keyboardType="decimal-pad"
      />
    </View>
  );
});
