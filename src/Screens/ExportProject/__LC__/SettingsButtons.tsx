import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import AlertService from '@Services/AlertService';
import { useLocalSearchParams } from 'expo-router';

export const AvailableExportFormatButtons = memo(() => {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.exportProject[config.language], []);

  const onDocxSelected = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'export project',
      id_project: id_project,
    }, () => navigate('PROJECT SCOPE', id_project));
  }, []);

  return (
    <View
      style={{ gap: 1 }}
    >
      <Button.TextWithIcon
        title={R['Docx']}
        iconName="document-text"
        onPress={async () => await onDocxSelected()}
        theme={{
          font: theme.font_Button,
          font_Pressed: theme.font_active,
          background: theme.background_Button,
          background_Pressed: theme.background_active,
        }}
      />
    </View>
  );
});
