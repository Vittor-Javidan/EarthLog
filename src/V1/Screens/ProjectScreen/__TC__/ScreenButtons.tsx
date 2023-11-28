import React, { memo, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V1/Globals/NavigationControler';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';
import CacheService from '@V1/Services/CacheService';

import { Button } from '@V1/Button/index';
import { Layout } from '@V1/Layout/index';

export const ScreenButtons = memo((props: {
  onCreateSample: () => void
  onUploadProject: () => void
}) => {

  const id_project      = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  return (
    <Layout.ScreenButtons

      buttons={<>
        <Button.RoundedIcon
          iconName="home"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('HOME SCOPE')}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="cloud-upload"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={props.onUploadProject}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        {projectSettings.rules.showSampleCreationButton && (
          <Button.RoundedIcon
            iconName="clipboard"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={props.onCreateSample}
            theme={{
              font: theme.font,
              font_Pressed: theme.confirm,
              background: theme.confirm,
              background_Pressed: theme.background_active,
            }}
          />
        )}
      </>}
    />
  );
});
