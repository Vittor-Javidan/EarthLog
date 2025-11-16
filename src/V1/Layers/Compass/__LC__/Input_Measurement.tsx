import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { TextInput, View } from "react-native";

import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";
import { RegexService } from "@V1/Services/RegexService";

import { Text } from "@V1/Text/index";

/**
 * Accepts and returns the values of `heading (in the range of 0-360 degrees)`
 * and `dip (in the range of 0 to 90 degrees)` as `strings` to allow easier input handling.
 */
export const Input_Measurement = memo((props: {
  heading: string;
  dip: string;
  onHeadingChange: (text: string) => void;
  onDipChange: (text: string) => void;
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.layers.compass[config.language], [])
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
      props.onHeadingChange(text);
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
      props.onDipChange(text);
    } else {
      setDip(text);
      setInvalidDip(true);
    }
  }, []);

  useEffect(() => {
    setHeading(props.heading);
    setDip(props.dip);
  }, [props.heading, props.dip]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: 10,
          gap: 10,
        }}
      >
        <Text h3
          style={{
            color: '#fff',
          }}
        >
          {R['Heading']}
        </Text>
        <Text h3
          style={{
            color: '#fff',
          }}
        >
          {R['Dip']}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          marginBottom: 40,
          borderRadius: 20,
        }}
      >
        <TextInput
          style={{
            width: 100,
            alignItems: 'center',
            alignSelf: 'center',
            paddingHorizontal: 10,
            fontSize: 18,
            color: invalidHeading ? '#f00' : '#000',
          }}
          textAlign="center"
          value={heading}
          keyboardType="numeric"
          onChangeText={(text) => onHeadingChange(text)}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          {'/'}
        </Text>
        <TextInput
          style={{
            width: 100,
            alignItems: 'center',
            alignSelf: 'center',
            paddingHorizontal: 10,
            fontSize: 18,
            color: invalidDip ? '#f00' : '#000',
          }}
          textAlign="center"
          value={dip}
          keyboardType="numeric"
          onChangeText={(text) => onDipChange(text)}
        />
      </View>
    </View>
  )
})