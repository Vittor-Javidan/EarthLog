import React, { useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import Drawer from './Drawer';
import Inputs_ProjectSettings from './LocalComponents/Inputs_ProjectSettings';
import Widgets_Project from './LocalComponents/Widgets_Project';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

import API_ProjectCreation from './LocalComponents/API_ProjectCreation';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';

export default function ProjectCreationScreen() {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  useBackPress(async () => await exitScreen());

  async function exitScreen() {
    API_ProjectCreation.reset();
    await useNavigate('HOME SCREEN');
  }

  return (
    <Layout.Root
      title={stringResources['Project creation']}
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Inputs_ProjectSettings />
      <Widgets_Project />
    </Layout.Root>
  );
}
