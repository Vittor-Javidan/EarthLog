import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Inputs_ProjectSettings from './LocalComponents/Inputs_ProjectSettings';
import Widgets_Project from './LocalComponents/Widgets_Project';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default function ProjectSettingsScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);

  useBackPress(async () => await useNavigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={stringResources['Project Settings']}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Layout.View
        style={{
          paddingTop: 10,
          padding: 5,
          gap: 10,
        }}
      >
        <Inputs_ProjectSettings />
        <Widgets_Project />
      </Layout.View>
    </Layout.Root>
  );
}
