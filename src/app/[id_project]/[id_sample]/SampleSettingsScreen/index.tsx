import React, { useMemo } from 'react';
import { Layout } from '@Components/Layout';
import NavigationTree from './NavigationTree';
import ScreenButtons from './ScreenButtons';
import Inputs_SampleSettings from './LocalComponents/Inputs_SampleSettings';
import DeleteButton from './LocalComponents/DeleteButton';
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
      <Inputs_SampleSettings />
      <DeleteButton />
    </Layout.Root>
  );
}
