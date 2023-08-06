
import React, { useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import NavigationTree from './NavigationTree';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ScreenButtons from './ScreenButtons';

export default function SettingsScreen(): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SettingsScreen[language], []);

  useBackPress(async () => await useNavigate('HOME SCREEN'));

  return (
    <Layout.Root
      title={stringResources['Settings']}
      screenButtons={<ScreenButtons />}
      drawerChildren={<></>}
      navigationTree={<NavigationTree />}
    >
      <Layout.Button.Text
        title={stringResources['Language']}
        onPress={async () => await useNavigate('LANGUAGES SCREEN')}
      />
      <Layout.Button.Text
        title={stringResources['Theme']}
        onPress={async () => await useNavigate('THEME SCREEN')}
      />
    </Layout.Root>
  );
}
