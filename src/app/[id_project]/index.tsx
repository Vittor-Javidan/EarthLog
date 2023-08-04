import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import { Drawer } from './Drawer';
import SampleButtons from './SampleButtons';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function ProjectScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const theme = useMemo(() => ConfigService.config.theme, []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);
  const stringResources = useMemo(
    () => translations.Screens.ProjectScreen[ConfigService.config.language], []
  );

  useBackPress(async () => await exitScreen());

  async function exitScreen() {
    await useNavigate('HOME SCREEN');
  }

  async function goToSampleCreationScreenCreation() {
    await useNavigate('SAMPLE CREATION SCREEN', id_project);
  }

  return (
    <Layout.Root
      title={projectSettings.name}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={async () => await exitScreen()}
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
          title={stringResources['New sample']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={async () => await goToSampleCreationScreenCreation()}
        />
      </Layout.View>
    </Layout.Root>
  );
}
