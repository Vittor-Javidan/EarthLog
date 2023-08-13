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

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.TemplateScreen[language], []);

  useBackPress(async () => await useNavigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={stringResources['Template']}
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
        <Widgets_Template />
      </Layout.View>
    </Layout.Root>
  );
}
