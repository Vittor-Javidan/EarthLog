import React, { useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Button } from '@Components/Layout/Button';

export default function InputDisplayButton(props: {
  onPress: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.GPSInput[language], []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Button.TextWithIcon
        title={R['Manual']}
        iconSide="Right"
        iconName="pencil-sharp"
        color_background={theme.secondary}
        color_font={theme.onSecondary}
        onPress={() => props.onPress()}
        style={{
          height: 40,
          paddingVertical: 5,
          borderRadius: 10,
        }}
      />
    </View>
  );
}
