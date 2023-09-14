import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import { Button } from '@Components/Layout/Button';
import H3 from '@Components/Layout/Text/H3';

type Vibration = 'warning' | 'success'

export default function ExitApp(props: {
  question: string
  onAccept: () => void
  onRefuse: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  useEffect(() => {
    vibrate('warning');
  }, []);

  async function onAccept() {
    props.onAccept();
    await AlertService.runAcceptCallback();
    await vibrate('warning');
  }

  async function onRefuse() {
    props.onRefuse();
    await vibrate('success');
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.primary,
        borderRadius: 10,
        paddingVertical: 10,
        gap: 30,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <H3
          style={{
            textAlign: 'center',
            padding: 10,
          }}
        >
          {props.question}
        </H3>
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
          color_background={theme.secondary}
          color={theme.confirm}
          color_onPressed={theme.tertiary}
          onPress={async () => await onAccept()}
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
          color_background={theme.wrong}
          color={theme.onWrong}
          color_onPressed={theme.tertiary}
          onPress={async () => onRefuse()}
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

async function vibrate(type: Vibration) {
  switch (type) {
    case 'warning': await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning); break;
    case 'success': await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success); break;
  }
}
