import React, { useEffect, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import AlertService from '@V1/Services/AlertService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';
import { Text } from '@V1/Text/index';
import { LC } from '../__LC__';

export const Warning = memo((props: {
  question: string
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);

  const onAccept = useCallback(() => {
    AlertService.runAcceptCallback();
    props.closeModal();
  }, [props.closeModal]);

  useEffect(() => {
    HapticsService.vibrate('warning');
  }, []);

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
            color: theme.font,
          }}
        >
          {props.question}
        </Text>
      </View>
      <Button.ConfirmSwipe
        onCancel={() => props.closeModal()}
        onSwipe={() => onAccept()}
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
