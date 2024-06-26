import React, { useEffect, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@V2/Translations/index';
import HapticsService from '@V2/Services/HapticsService';
import ConfigService from '@V2/Services/ConfigService';
import AlertService from '@V2/Services/AlertService';
import ThemeService from '@V2/Services/ThemeService';

import { Text } from '@V2/Text/index';
import { LC } from '@V2/Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const ExitApp = memo((props: {
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert.exitApp[config.language], []);

  const onAccept = useCallback(() => {
    props.closeModal();
    AlertService.runAcceptCallback();
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
            color: theme.font,
            padding: 10,
          }}
        >
          {R['Want to exit?']}
        </Text>
      </View>
      <FooterButtons
        onCancel={() => props.closeModal()}
        onConfirm={() => onAccept()}
      />
    </LC.PopUp>
  );
});
