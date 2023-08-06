import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ScreenButtons from './ScreenButtons';
import NavigationTree from './NavigationTree';
import Widgets_Template from './LocalComponents/Widgets_Template';

export default function TemplateScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.TemplateScreen[language], []);

  useBackPress(async () => await useNavigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={stringResources['Template']}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Widgets_Template />
    </Layout.Root>
  );
}