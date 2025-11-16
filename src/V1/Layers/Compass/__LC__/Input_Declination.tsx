import  React, { memo, useMemo, useState } from "react";
import { View, TextInput } from "react-native";

import { translations } from "@V1/Translations/index";
import { ConfigService } from "@V1/Services/ConfigService";
import { RegexService } from "@V1/Services/RegexService";

import { Text } from "@V1/Text/index";

export const Input_Declination = memo((props: {
  declination: number
  onDeclinationChange: (declination: number) => void
}) => {

  const config = useMemo(() => ConfigService.config, [])
  const R      = useMemo(() => translations.layers.compass[config.language], []);
  const [declination ,setDeclination] = useState<string>(`${props.declination}`);
  const [invalidDeclination ,setInvalidDeclination] = useState<boolean>(false);

  const onDeclinationChange = (text: string) => {

    let valid = RegexService.rule['declination'].test(text);
    text = text.replace(',', '.');
    text = text.replace(' ', '');

    const number = Number(text);
    switch (true) {
      case isNaN(number):                   valid = false; break;
      case number < -360:                   valid = false; break;
      case number > 360:                    valid = false; break;
      case number >= -360 && number <= 360: valid = true ; break;
    }

    if (valid) {
      setDeclination(text);
      setInvalidDeclination(false);
      props.onDeclinationChange(number);
    } else {
      setDeclination(text);
      setInvalidDeclination(true);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Text h1
        style={{
          color: '#fff',
        }}
      >
        {R['Declination']}
      </Text>
      <TextInput
        style={{
          backgroundColor: '#fff',
          color: invalidDeclination ? '#f00' : '#000',
          width: 80,
          borderRadius: 8,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 10,
          fontSize: 18,
        }}
        textAlign="right"
        value={declination}
        keyboardType="numeric"
        onChangeText={(text) => onDeclinationChange(text)}
      />
    </View>
  );
})