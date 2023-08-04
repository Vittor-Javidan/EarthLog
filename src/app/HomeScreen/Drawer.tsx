import React, { useMemo } from 'react';
import { Layout } from '@Layout/index';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import { useNavigate } from '@Hooks/index';

export default function Drawer() {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);

  return (
    <Layout.DrawerButton
      title={stringResources['Settings']}
      onPress={() => useNavigate('SETTINGS SCREEN')}
    />
  );
}
