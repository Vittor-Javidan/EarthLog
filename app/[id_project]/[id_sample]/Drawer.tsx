import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';
import { useNavigate } from 'app/GlobalHooks';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export function Drawer() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleScreen[language], []);

  return (<>
    <Layout.DrawerButton
      title={stringResources['Sample settings']}
      onPress={async () => await useNavigate('SAMPLE SETTINGS SCREEN', id_project, id_sample)}
    />
  </>);
}
