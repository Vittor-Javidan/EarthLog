import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import Inputs_SampleSettings from './LocalComponents/Inputs_SampleSettings';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

import API_Inputs_SampleSettings from './LocalComponents/API_Inputs_SampleSettings';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';

export default function SampleCreationScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleCreationScreen[language], []);

  useBackPress(async () => await exitScreen('PROJECT SCREEN'));

  async function exitScreen(
    screen: 'PROJECT SCREEN' | 'HOME SCREEN'
  ) {
    API_Inputs_SampleSettings.reset();
    await useNavigate(screen, id_project);
  }

  return (
    <Layout.Root
      title={stringResources['New sample']}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Inputs_SampleSettings />
    </Layout.Root>
  );
}
