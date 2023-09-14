import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import { Button } from '@Components/Layout/Button';
import H3 from '@Components/Layout/Text/H3';

type Vibration = 'warning' | 'success'

export default function Warning(props: {
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
      <Button.DeleteSwipe
        onCancel={() => props.onRefuse()}
        onSwipe={async () => await onAccept()}
        buttonRadius={25}
        compensateMargin={30}
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
