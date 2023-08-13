import React, { useMemo } from 'react';
import { Layout } from '@Layout/index';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import { useNavigate } from '@Hooks/index';

export default function Drawer() {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);

  return (
    <Layout.Button.Drawer
      title={stringResources['Settings']}
      onPress={() => useNavigate('SETTINGS SCREEN')}
    />
  );
}
