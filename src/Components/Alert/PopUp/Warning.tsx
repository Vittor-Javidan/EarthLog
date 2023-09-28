import React, { useEffect, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';

import { Button } from '@Button/index';
import { Text } from '@Text/index';

export const Warning = memo((props: {
  question: string | undefined
  onFinish: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  useEffect(() => {
    HapticsService.vibrate('warning');
  }, []);

  const onAccept = useCallback(async () => {
    props.onFinish();
    await AlertService.runAcceptCallback();
  }, [props.onFinish]);

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
          {props.question ?? ''}
        </Text>
      </View>
      <Button.ConfirmSwipe
        onCancel={() => props.onFinish()}
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
});
