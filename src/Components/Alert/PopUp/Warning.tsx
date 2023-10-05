import React, { useEffect, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';

import { Button } from '@Button/index';
import { Text } from '@Text/index';
import { LC } from '../__LC__';

export const Warning = memo((props: {
  question: string | undefined
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  useEffect(() => {
    HapticsService.vibrate('warning');
  }, []);

  const onAccept = useCallback(async () => {
    await AlertService.runAcceptCallback();
    props.closeModal();
  }, [props.closeModal]);

  return (
    <LC.PopUp>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text h3
          style={{
            textAlign: 'center',
            paddingHorizontal: 10,
          }}
        >
          {props.question ?? ''}
        </Text>
      </View>
      <Button.ConfirmSwipe
        onCancel={() => props.closeModal()}
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
  </LC.PopUp>
  );
});
