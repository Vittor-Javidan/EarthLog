import React, { useMemo } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';

import AppRoutes from '@Globals/AppRoutes';
import { ProjectSettings, ThemeDTO } from '@Types/index';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import useBackPress from 'app/GlobalHooks';
import SampleButtons from './SampleButtons';


export default function ProjectScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const settings = useMemo<ProjectSettings>(() => ProjectService.getProjectFromCache(id_project), []);

  LogService.useLog(`RENDERED: Project Screen
    id: ${id_project}
  `);

  useBackPress(() => exitScreen());

  function exitScreen() {
    navController.push(AppRoutes.HOME);
  }

  function goToSampleCreationScreenCreation() {
    navController.push(AppRoutes.PS_SAMPLE_CREATION_SCREEN(settings.id_project));
  }

  return (
    <Layout.Root
      title={settings.name}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => exitScreen()}
        />,
      ]}
    >
      <Layout.ScrollView>
        <SampleButtons />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="New Sample"
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => goToSampleCreationScreenCreation()}
        />
      </Layout.View>
    </Layout.Root>
  );
}
