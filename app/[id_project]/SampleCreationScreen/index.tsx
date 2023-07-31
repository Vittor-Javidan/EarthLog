import React, { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Layout } from '@Components/Layout';

import AppRoutes from '@Globals/AppRoutes';
import { ThemeDTO } from '@Types/index';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_SampleCreation from './API_SampleCreation';
import Inputs_SampleSettings from './Inputs_SampleSettings';
import useBackPress from 'app/GlobalHooks';
import { Icon } from '@Components/Icon';

export default function SampleCreationScreen() {

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const id_project = useLocalSearchParams().id_project as string;

  useBackPress(() => exitScreen());

  function exitScreen() {
    API_SampleCreation.reset();
    navController.push(AppRoutes.PROJECT_SCREEN(id_project));
  }

  function goToHomeScreen() {
    API_SampleCreation.reset();
    navController.push(AppRoutes.HOME);
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

  LogService.useLog('SAMPLE CREATION SCREEN: rendered');

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
