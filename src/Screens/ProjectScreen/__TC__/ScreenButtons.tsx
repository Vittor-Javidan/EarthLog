import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function ScreenButtons(props: {
  onSampleCreation: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  async function createSample() {
    AlertService.handleAlert(true, {
      question: '',
      type: 'sample creation',
      id_project: id_project,
    }, () => {
      props.onSampleCreation();
    });
  }

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
        {projectSettings.rules.showSampleCreationButton && (
          <Button.RoundedIcon
            iconName="clipboard"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={async () => await createSample()}
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
}
