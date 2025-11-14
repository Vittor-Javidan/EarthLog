import  React, { memo, useMemo, useState } from "react";
import { View, TextInput } from "react-native";
import { ConfigService } from "@V1/Services/ConfigService";
import { translations } from "@V1/Translations/index";
import { Text } from "@V1/Text/index";

export const DeclinationInput = memo((props: {
  value: number
  onDeclinationChange: (declination: number) => void
}) => {

  const config = useMemo(() => ConfigService.config, [])
  const R      = useMemo(() => translations.layers.compass[config.language], []);
  const [declination, setDeclination] = useState<string>(props.value.toString());

  const onDeclinationChange = (text: string) => {

    // allow only numbers and one dot or minus sign
    const regex = /^-?\d*\.?\d*$/;
    if (!regex.test(text)) return;

    // if text is empty or just a minus sign, set to 0
    if (text === '' || text === '-') {
      setDeclination(text.trim());
      props.onDeclinationChange(0);
      return;
    }

    const number = Number(text);

    // If bigger than 360, set to 360
    if (number > 360) {
      setDeclination('360');
      props.onDeclinationChange(360);
      return;
    }

    // If smaller than -360, set to -360
    if (number < -360) {
      setDeclination('-360');
      props.onDeclinationChange(-360);
      return;
    }

    setDeclination(text.trim());
    props.onDeclinationChange(Number(text));
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 10,
        width: '100%',
        paddingHorizontal: 20,
        gap: 10,
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
          width: 60,
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