import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Text } from '@Text/index';

type Vibration = 'warning' | 'success'

export default function Warning(props: {
  question: string
  onAccept: () => void
  onRefuse: () => void
}) {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);

  useEffect(() => {
    vibrate('warning');
  }, []);

  async function onAccept() {
    props.onAccept();
    await AlertService.runAcceptCallback();
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.primary,
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
        <Text.H3
          style={{
            textAlign: 'center',
            padding: 10,
          }}
        >
          {props.question}
        </Text.H3>
      </View>
      <Button.ConfirmSwipe
        onCancel={() => props.onRefuse()}
        onSwipe={async () => await onAccept()}
        buttonRadius={25}
        compensateMargin={30}
        theme={{
          font: theme.onTertiary,
          background: theme.tertiary,
          confirm: theme.confirm,
          wrong: theme.wrong,
        }}
      />
  </View>
  );
}

async function vibrate(type: Vibration) {
  switch (type) {
    case 'warning': await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning); break;
    case 'success': await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success); break;
  }
}
