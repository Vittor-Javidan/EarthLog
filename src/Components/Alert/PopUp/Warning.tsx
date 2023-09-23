import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';
import ApticsService from '@Services/ApticsService';

import { Button } from '@Button/index';
import { Text } from '@Text/index';

export default function Warning(props: {
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
      <Button.ConfirmSwipe
        onCancel={() => props.onRefuse()}
        onSwipe={async () => await onAccept()}
        buttonRadius={25}
        compensateMargin={30}
        theme={{
          font: theme.confirm,
          background: theme.background_active,
          confirm: theme.confirm,
          wrong: theme.wrong,
        }}
      />
  </View>
  );
}
