import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import Inputs_SampleSettings from './Inputs_SampleSettings';
import { useBackPress, useNavigate } from 'app/GlobalHooks';

import { ThemeDTO } from '@Types/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_SampleCreation from './API_SampleCreation';

export default function SampleCreationScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  useBackPress(() => exitScreen());

  function exitScreen() {
    API_SampleCreation.reset();
    useNavigate('PROJECT SCREEN', id_project);
  }

  function goToHomeScreen() {
    API_SampleCreation.reset();
    useNavigate('HOME SCREEN');
  }

  async function onConfirm() {

    if (API_SampleCreation.temporarySettings.id_sample === '') {
      alert('ID cannot be empty. This is your sample folder name.');
      return;
    }

    if (API_SampleCreation.temporarySettings.name === '') {
      alert('Sample Name Empty.');
      return;
    }

    await ProjectService.createSample(
      id_project,
      API_SampleCreation.temporarySettings,
      () => exitScreen(),
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.Root
      title="Sample Creation"
      iconName="pencil-sharp"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => goToHomeScreen()}
        />,
        <Icon.Project
          key="treeIcon_2"
          onPress={() => exitScreen()}
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
          title="Cancel"
          overrideBackgroundColor={theme.wrong}
          overrideTextColor={theme.onWrong}
          onPress={() => exitScreen()}
        />
        <Layout.Button
          title="Create"
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={async () => await onConfirm()}
        />
      </Layout.View>
    </Layout.Root>
  );
}
