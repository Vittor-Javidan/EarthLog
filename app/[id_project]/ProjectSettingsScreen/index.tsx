import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import Inputs_ProjectSettings from './Inputs_ProjectSettings';
import DeleteButton from './DeleteButton';
import Widgets_Project from './Widgets_Project';
import { useBackPress, useNavigate } from 'app/GlobalHooks';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function ProjectSettingsScreen() {

  const id_project = useLocalSearchParams().id_project as string;
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[ConfigService.config.language], []);

  useBackPress(async () => await useNavigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={stringResources['Project Settings']}
      iconName="settings"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Icon.Project
          key="treeIcon_2"
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />,
      ]}
    >
      <Layout.ScrollView>
        <Inputs_ProjectSettings />
        <Widgets_Project />
        <DeleteButton />
      </Layout.ScrollView>
    </Layout.Root>
  );
}
