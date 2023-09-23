import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';
import ApticsService from '@Services/ApticsService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';

export default function ExitApp(props: {
  question: string
  onAccept: () => void
  onRefuse: () => void
}) {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  useEffect(() => {
    ApticsService.vibrate('warning');
  }, []);

  async function onAccept() {
    props.onAccept();
    await AlertService.runAcceptCallback();
    ApticsService.vibrate('warning');
  }

  async function onRefuse() {
    props.onRefuse();
    ApticsService.vibrate('success');
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.background,
        borderRadius: 10,
        paddingVertical: 10,
        gap: 10,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text h3
          style={{
            textAlign: 'center',
            padding: 10,
          }}
        >
          {props.question}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Button.Icon
          iconName="checkmark-done-sharp"
          onPress={async () => await onAccept()}
          theme={{
            font: theme.confirm,
            font_Pressed: theme.confirm,
            background: theme.background_Button,
            background_Pressed: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
        <Button.Icon
          iconName="close"
          onPress={async () => onRefuse()}
          theme={{
            font: theme.font,
            font_Pressed: theme.wrong,
            background: theme.wrong,
            background_Pressed: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}
