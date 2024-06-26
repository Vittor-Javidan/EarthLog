import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V1/Globals/NavigationControler';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';
import AlertService from '@V1/Services/AlertService';

import { Button } from '@V1/Button/index';

export const AvailableExportFormatButtons = memo(() => {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.exportProject[config.language], []);

  const onDocxSelected = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'export project (DOCX)',
      id_project: id_project,
    }, () => navigate('PROJECT SCOPE', id_project));
  }, []);

  const onCSVSelected = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'export project (CSV)',
      id_project: id_project,
    }, () => navigate('PROJECT SCOPE', id_project));
  }, []);

  return (
    <View
      style={{ gap: 1 }}
    >
      <Button.TextWithIcon
        title={R['DOCX']}
        iconName="document-text"
        onPress={async () => await onDocxSelected()}
        theme={{
          font:              theme.font_Button,
          font_active:       theme.font_active,
          background:        theme.background_Button,
          background_active: theme.background_active,
        }}
      />
      <Button.TextWithIcon
        title={R['CSV']}
        iconName="document-text"
        onPress={async () => await onCSVSelected()}
        theme={{
          font:              theme.font_Button,
          font_active:       theme.font_active,
          background:        theme.background_Button,
          background_active: theme.background_active,
        }}
      />
    </View>
  );
});
