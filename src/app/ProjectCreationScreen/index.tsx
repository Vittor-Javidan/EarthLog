import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { useBackPress } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import Drawer from './Drawer';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Inputs_ProjectSettings from './LocalComponents/Inputs_ProjectSettings';
import Widgets_Project from './LocalComponents/Widgets_Project';
import API_TemporaryProject from './LocalComponents/API_TemporaryProject';

export default function ProjectCreationScreen() {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  useBackPress(async () => {
    API_TemporaryProject.reset();
    navigate('HOME SCREEN');
  });

  return (
    <Layout.Root
      title={stringResources['Project creation']}
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Layout.ScrollView
        contenContainerStyle={{
          paddingTop: 10,
          padding: 5,
          gap: 10,
        }}
      >
        <Inputs_ProjectSettings />
        <Widgets_Project />
      </Layout.ScrollView>
    </Layout.Root>
  );
}
