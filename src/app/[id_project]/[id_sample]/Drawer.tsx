import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export function Drawer() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.SampleScreen[language], []);

  return (<>
    <Layout.Button.Drawer
      title={stringResources['Edit sample']}
      onPress={() => navigate('SAMPLE SETTINGS SCREEN', id_project, id_sample)}
    />
  </>);
}
