import React, { useEffect, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';

import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { HapticsService } from '@V1/Services/HapticsService';
import { ConfigService } from '@V1/Services/ConfigService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { Text } from '@V1/Text/index';
import { LC } from '@V1/Layers/PopUp/__LC__';
import { FooterButtons } from './FooterButtons';

export const ExitApp = memo((props: {
  closeModal: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const R      = useMemo(() => translations.component.alert.exitApp[config.language], []);

  const onAccept = useCallback(() => {
    props.closeModal();
    PopUpAPI.runAcceptCallback();
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
