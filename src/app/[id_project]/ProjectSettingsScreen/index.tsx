import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import Inputs_ProjectSettings from './Inputs_ProjectSettings';
import Widgets_Project from './Widgets_Project';
import DeleteButton from './DeleteButton';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function ProjectSettingsScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);

  useBackPress(async () => await useNavigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={stringResources['Project Settings']}
      iconName="settings"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="map"
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />,
      ]}
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />
      }
    >
      <Inputs_ProjectSettings />
      <Widgets_Project />
      <DeleteButton />
    </Layout.Root>
  );
}
