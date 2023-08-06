import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import API_Inputs_SampleSettings from './LocalComponents/API_Inputs_SampleSettings';
import { useNavigate } from '@Hooks/index';
import { translations } from '@Translations/index';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleCreationScreen[language], []);

  async function exitScreen(
    screen: 'PROJECT SCREEN' | 'HOME SCREEN'
  ) {
    API_Inputs_SampleSettings.reset();
    await useNavigate(screen, id_project);
  }

  async function exitAndOpenSample(id_sample: string) {
    API_Inputs_SampleSettings.reset();
    await useNavigate('SAMPLE SCREEN (FROM SAMPLE CREATION SCREEN)', id_project, id_sample);
  }

  async function onConfirm() {

    const { temporarySettings } = API_Inputs_SampleSettings;

    if (temporarySettings.id_sample === '') {
      alert(stringResources['ID cannot be empty']);
      return;
    }

    if (temporarySettings.name === '') {
      alert(stringResources['Name cannot be empty']);
      return;
    }

    await ProjectService.createSample(
      id_project,
      temporarySettings,
      async () => await exitAndOpenSample(temporarySettings.id_sample),
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
        onPress={async () => await exitScreen('PROJECT SCREEN')}
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
