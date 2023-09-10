import React, { useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';

import { Button } from '@Components/Layout/Button';

export default function FooterButtons(props: {
  onCancel: () => void
  onSave: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
      }}
    >
      <Button.Icon
        iconName="close"
        color_background={theme.wrong}
        onPress={() => props.onCancel()}
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
        onPress={() => props.onSave()}
        style={{
          height: 40,
          flex: 1,
          justifyContent: 'center',
          paddingVertical: 5,
          borderRadius: 10,
        }}
      />
    </View>
  );
}
