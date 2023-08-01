import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import Inputs_SampleSettings from './Inputs_SampleSettings';
import { useBackPress, useNavigate } from 'app/GlobalHooks';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_SampleCreation from './API_SampleCreation';
import { translations } from '@Translations/index';

export default function SampleCreationScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleCreationScreen[language], []);

  useBackPress(() => exitScreen('PROJECT SCREEN'));

  function exitScreen(
    screen: 'PROJECT SCREEN' | 'HOME SCREEN'
  ) {
    API_SampleCreation.reset();
    useNavigate(screen, id_project);
  }

  async function exitAndOpenSample(id_sample: string) {
    API_SampleCreation.reset();
    await ProjectService.loadAllWidgets_Sample(id_project, id_sample);
    useNavigate('SAMPLE SCREEN', id_project, id_sample);
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
        <Icon.Home
          key="treeIcon_1"
          onPress={() => exitScreen('HOME SCREEN')}
        />,
        <Icon.Project
          key="treeIcon_2"
          onPress={() => exitScreen('PROJECT SCREEN')}
        />,
      ]}
    >
      <Layout.ScrollView>
        <Inputs_SampleSettings />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title={stringResources['Cancel']}
          overrideBackgroundColor={theme.wrong}
          overrideTextColor={theme.onWrong}
          onPress={() => exitScreen('PROJECT SCREEN')}
        />
        <Layout.Button
          title={stringResources['Create']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={async () => await onConfirm()}
        />
      </Layout.View>
    </Layout.Root>
  );
}
