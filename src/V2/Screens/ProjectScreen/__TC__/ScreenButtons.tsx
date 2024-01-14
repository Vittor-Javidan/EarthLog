import React, { memo, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@V2/Globals/NavigationControler';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';
import CacheService from '@V2/Services/CacheService';

import { Button } from '@V2/Button/index';
import { Layout } from '@V2/Layout/index';

export const ScreenButtons = memo((props: {
  onCreateSample: () => void
  onUploadProject: () => void
}) => {

  const id_project      = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache({ id_project }), []);

  return (
    <Layout.ScreenButtons

      buttons={<>
        <Button.RoundedIcon
          iconName="home"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('HOME SCOPE')}
          theme={{
            font:              theme.font,
            font_active:       theme.backgroud,
            background:        theme.backgroud,
            background_active: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="cloud-upload"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={props.onUploadProject}
          theme={{
            font:              theme.font,
            font_active:       theme.backgroud,
            background:        theme.backgroud,
            background_active: theme.background_active,
          }}
        />
        {projectSettings.rules.showSampleCreationButton && (
          <Button.RoundedIcon
            iconName="clipboard"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={props.onCreateSample}
            theme={{
              font:              theme.font,
              font_active:       theme.confirm,
              background:        theme.confirm,
              background_active: theme.background_active,
            }}
          />
        )}
      </>}
    />
  );
});
