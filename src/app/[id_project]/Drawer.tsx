import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export function Drawer() {

  const id_project = useLocalSearchParams().id_project as string;

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectScreen[language], []);

  return (<>
    <Layout.Button.Drawer
      title={stringResources['Edit project']}
      onPress={() => navigate('PROJECT SETTINGS SCREEN', id_project)}
    />
    <Layout.Button.Drawer
      title={stringResources['Edit template']}
      onPress={() => navigate('TEMPLATE SCREEN', id_project)}
    />
  </>);
}
