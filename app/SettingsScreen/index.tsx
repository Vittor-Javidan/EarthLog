
import React, { useMemo } from 'react';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { useBackPress, useNavigate } from 'app/GlobalHooks';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function SettingsScreen(): JSX.Element {

  const stringResources = useMemo(
    () => translations.Screens.SettingsScreen[ConfigService.config.language], []
  );

  useBackPress(async () => await useNavigate('HOME SCREEN'));

  return (
    <Layout.Root
      title={stringResources['Settings']}
      iconName="settings"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
      ]}
    >
      <Layout.ScrollView
        style={{ flex: 1 }}
      >
        <Layout.Button
          title={stringResources['Language']}
          onPress={async () => await useNavigate('LANGUAGES SCREEN')}
        />
        <Layout.Button
          title={stringResources['Theme']}
          onPress={async () => await useNavigate('THEME SCREEN')}
        />
      </Layout.ScrollView>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}
