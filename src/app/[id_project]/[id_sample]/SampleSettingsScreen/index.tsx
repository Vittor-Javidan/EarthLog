import React, { useMemo } from 'react';
import { Layout } from '@Components/Layout';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Inputs_SampleSettings from './LocalComponents/Inputs_SampleSettings';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default function SampleSettingsScreen() {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);

  return (
    <Layout.Root
      title={stringResources['Sample Settings']}
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
