import React, { memo, useCallback, useState } from "react";
import { TextInput, View } from "react-native";

import {
  WidgetTheme
} from "@V1/Types";

import { RegexService } from "@V1/Services/RegexService";
import { Text } from "@V1/Text/index";

export const Input_Measurement = memo((props: {
  heading: string;
  dip: string;
  lockedData: boolean | undefined
  allowMeasurementDataChange: boolean | undefined
  theme: WidgetTheme
  onHeadingChange: (text: number) => void;
  onDipChange: (text: number) => void;
}) => {

  const [heading ,setHeading] = useState<string>(props.heading);
  const [dip     ,setDip    ] = useState<string>(props.dip);
  const [invalidHeading ,setInvalidHeading ] = useState<boolean>(false);
  const [invalidDip     ,setInvalidDip     ] = useState<boolean>(false);

  const onHeadingChange = useCallback((text: string) => {
    
    let valid = RegexService.rule['heading'].test(text);
    text = text.replace(',', '.');
    text = text.replace(' ', '');

    const number = Number(text);
    switch (true) {
      case isNaN(number):                valid = false; break;
      case number < 0:                   valid = false; break;
      case number > 360:                 valid = false; break;
      case number >= 0 && number <= 360: valid = true ; break;
    }

    if (valid) {
      setHeading(text)
      setInvalidHeading(false);
      props.onHeadingChange(number);
    } else {
      setHeading(text);
      setInvalidHeading(true);
    }
  }, []);

  const onDipChange = useCallback((text: string) => {

    let valid = RegexService.rule['dip'].test(text);
    text = text.replace(',', '.');
    text = text.replace(' ', '');
    
    const number = Number(text);
    switch (true) {
      case isNaN(number):               valid = false; break;
      case number < 0:                  valid = false; break;
      case number > 90:                 valid = false; break;
      case number >= 0 && number <= 90: valid = true ; break;
    }

    if (valid) {
      setDip(text);
      setInvalidDip(false);
      props.onDipChange(number);
    } else {
      setInvalidDip(true);
      setDip(text);
    }
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      }}
    >
      <TextInput
        editable={(props.allowMeasurementDataChange ?? false) && (!props.lockedData)}
        style={{
          color: invalidHeading ? props.theme.wrong : props.theme.font,
          fontSize: 14,
          paddingVertical: 0,
          paddingHorizontal: 5,
        }}
        textAlign="right"
        value={heading}
        keyboardType="numeric"
        onChangeText={(text) => onHeadingChange(text)}
      />
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
        }}
      >
        {'/'}
      </Text>
      <TextInput
        editable={(props.allowMeasurementDataChange ?? false) && (!props.lockedData)}
        style={{
          fontSize: 14,
          color: invalidDip ? props.theme.wrong : props.theme.font,
          paddingVertical: 0,
          paddingHorizontal: 5,
        }}
        textAlign="left"
        value={dip}
        keyboardType="numeric"
        onChangeText={(text) => onDipChange(text)}
      />
    </View>
  )
})