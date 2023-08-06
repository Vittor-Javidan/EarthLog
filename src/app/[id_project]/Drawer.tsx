import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export function Drawer() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectScreen[language], []);

  return (<>
    <Layout.Button.Drawer
      title={stringResources['Project settings']}
      onPress={async () => await useNavigate('PROJECT SETTINGS SCREEN', id_project)}
    />
    <Layout.Button.Drawer
      title={stringResources['Template']}
      onPress={async () => await useNavigate('TEMPLATE SCREEN', id_project)}
    />
  </>);
}
