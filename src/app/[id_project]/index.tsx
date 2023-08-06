import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { Drawer } from './Drawer';
import SampleButtons from './SampleButtons';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function ProjectScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  useBackPress(async () => await useNavigate('HOME SCREEN'));

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
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
      ]}
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () => await useNavigate('HOME SCREEN')}
        />
      }
      button_right={
        <Layout.Button.IconRounded
          iconName="clipboard"
          showPlusSign={true}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={async () => await goToSampleCreationScreenCreation()}
        />
      }
    >
      <SampleButtons />
    </Layout.Root>
  );
}
