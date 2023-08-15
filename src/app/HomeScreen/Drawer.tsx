import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default function Drawer() {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);

  return (
    <Layout.Button.Drawer
      title={stringResources['Settings']}
      onPress={() => navigate('SETTINGS SCREEN')}
    />
  );
}
