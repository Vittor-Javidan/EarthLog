import React, { useEffect, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';
import { LC } from '@Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const ExitApp = memo((props: {
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert.exitApp[config.language], []);

  useEffect(() => {
    HapticsService.vibrate('warning');
  }, []);

  const onAccept = useCallback(async () => {
    props.closeModal();
    await AlertService.runAcceptCallback();
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
            color: theme.font,
            padding: 10,
          }}
        >
          {R['Want to exit?']}
        </Text>
      </View>
      <FooterButtons
        onCancel={() => props.closeModal()}
        onConfirm={async () => await onAccept()}
      />
    </LC.PopUp>
  );
});
