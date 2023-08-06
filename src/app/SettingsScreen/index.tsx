
import React, { useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function SettingsScreen(): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SettingsScreen[language], []);

  useBackPress(async () => await useNavigate('HOME SCREEN'));

  return (
    <Layout.Root
      title={stringResources['Settings']}
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="home"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Layout.Button.Icon
          key="treeIcon_2"
          iconName="settings"
        />,
      ]}
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () =>  await useNavigate('HOME SCREEN')}
        />
      }
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

function Drawer() {
  return <></>;
}
