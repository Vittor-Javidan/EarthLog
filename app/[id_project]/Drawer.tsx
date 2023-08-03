import React, { useMemo } from 'react';
import { Layout } from '@Components/Layout';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import { useNavigate } from 'app/GlobalHooks';
import { useLocalSearchParams } from 'expo-router';

export function Drawer() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectScreen[language], []);

  return (<>
    <Layout.DrawerButton
      title={stringResources['Project settings']}
      onPress={async () => await useNavigate('PROJECT SETTINGS SCREEN', id_project)}
    />
  </>);
}
