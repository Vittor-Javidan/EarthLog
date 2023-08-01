import React, { useMemo } from 'react';
import { Layout } from '@Components/Layout';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export function Drawer() {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleScreen[language], []);

  return (<>
    <Layout.DrawerButton
      title={stringResources['Sample settings']}
      onPress={() => {}}
    />
  </>);
}
