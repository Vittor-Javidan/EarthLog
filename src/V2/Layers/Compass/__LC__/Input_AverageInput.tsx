import  React, { memo, useMemo, useState } from "react";
import { View, TextInput } from "react-native";

import { translations } from "@V2/Translations/index";
import { ConfigService } from "@V2/Services/ConfigService";
import { RegexService } from "@V2/Services/RegexService";

import { Text } from "@V2/Text/index";

export const Input_Average = memo((props: {
  average: number
  onAverageChange: (average: number) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.layers.compass[config.language], [])
  const [average   ,setAverage   ] = useState<string>(`${props.average}`);
  const [invalidAvg,setInvalidAvg] = useState<boolean>(false);

  const onAverageChange = (text: string) => {

    let valid = RegexService.rule['measurementAvg'].test(text);
    text = text.replace(',', '');
    text = text.replace('.', '');
    text = text.replace(' ', '');

    const number = Number(text);
    switch (true) {
      case isNaN(number):               valid = false; break;
      case number < 1:                  valid = false; break;
      case number >= 1:                 valid = true; break;
    }

    if (valid) {
      setAverage(text);
      setInvalidAvg(false);
      props.onAverageChange(number);
    } else {
      setAverage(text);
      setInvalidAvg(true);
    }
  }

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
        {R['Average']}
      </Text>
      <TextInput
        style={{
          backgroundColor: '#fff',
          color: invalidAvg ? '#f00' : '#000',
          width: 80,
          borderRadius: 8,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 10,
          fontSize: 18,
        }}
        textAlign="right"
        value={average}
        keyboardType="numeric"
        onChangeText={(text) => onAverageChange(text)}
      />
    </View>
  );
})