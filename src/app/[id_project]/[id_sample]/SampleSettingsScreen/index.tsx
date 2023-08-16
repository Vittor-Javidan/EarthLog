import React, { useMemo } from 'react';

import { Layout } from '@Components/Layout';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Inputs_SampleSettings from './LocalComponents/Inputs_SampleSettings';

export default function SampleSettingsScreen() {

  const { language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);

  return (
    <Layout.Root
      title={stringResources['Edit sample']}
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
        <Inputs_SampleSettings />
      </Layout.View>
    </Layout.Root>
  );
}
