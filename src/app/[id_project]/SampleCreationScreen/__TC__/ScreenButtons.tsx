import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Layout } from '@Components/Layout';
import { API } from '../__API__';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.SampleCreationScreen[language], []);

  function exitScreen() {
    API.SampleSettingsWidget.reset();
    navigate('PROJECT SCREEN', id_project);
  }

  async function onConfirm() {

    const { temporarySettings } = API.SampleSettingsWidget;

    if (temporarySettings.id_sample === '') {
      alert(stringResources['ID cannot be empty']);
      return;
    }

    await ProjectService.createSample(
      id_project,
      temporarySettings,
      () => {
        CacheService.allSamples = [temporarySettings, ...CacheService.allSamples];
        exitScreen();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.ScreenButtons
    button_left={
      <Layout.Button.IconRounded
        iconName="close"
        showPlusSign={false}
        color_background={theme.wrong}
        color={theme.onWrong}
        onPress={() => exitScreen()}
      />
    }
    button_right={
      <Layout.Button.IconRounded
        iconName="save"
        showPlusSign={false}
        color_background={theme.confirm}
        color={theme.onConfirm}
        onPress={async () => await onConfirm()}
      />
    }
    />
  );
}
