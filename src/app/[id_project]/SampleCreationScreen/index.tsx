import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import Inputs_SampleSettings from './Inputs_SampleSettings';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_SampleCreation from './API_SampleCreation';

export default function SampleCreationScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleCreationScreen[language], []);

  useBackPress(async () => await exitScreen('PROJECT SCREEN'));

  async function exitScreen(
    screen: 'PROJECT SCREEN' | 'HOME SCREEN'
  ) {
    API_SampleCreation.reset();
    await useNavigate(screen, id_project);
  }

  async function exitAndOpenSample(id_sample: string) {
    API_SampleCreation.reset();
    await useNavigate('SAMPLE SCREEN (FROM SAMPLE CREATION SCREEN)', id_project, id_sample);
  }

  async function onConfirm() {

    const { temporarySettings } = API_SampleCreation;

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
    <Layout.Root
      title={stringResources['New sample']}
      iconName="clipboard"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await exitScreen('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="map"
          onPress={async () => await exitScreen('PROJECT SCREEN')}
        />,
      ]}
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
    >
      <Inputs_SampleSettings />
    </Layout.Root>
  );
}
