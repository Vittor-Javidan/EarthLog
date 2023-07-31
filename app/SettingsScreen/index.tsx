
import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';

import { Languages } from '@Types/index';
import AppRoutes from '@Globals/AppRoutes';
import { translations } from '@Translations/index';
import { Translations_SettingsScreen } from '@Translations/Screens/SettingsScreen/SettingsScreen';

import ConfigService from '@Services/ConfigService';
import useBackPress from 'app/GlobalHooks';

export default function SettingsScreen(): JSX.Element {

  const navController = useRouter();
  const stringResources = useMemo<Translations_SettingsScreen[Languages]>(() => {
    return translations.Screens.SettingsScreen[ConfigService.config.language];
  }, []);

  useBackPress(() => exitScreen());

  function exitScreen() {
    navController.push(AppRoutes.HOME);
  }

  function goToLanguagesScreen() {
    navController.push(AppRoutes.SS_LANGUAGES_SCREEN);
  }

  function goToThemeScreen() {
    navController.push(AppRoutes.SS_THEME_SCREEN);
  }

  return (
    <Layout.Root
      title={stringResources['Settings']}
      iconName="settings"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => exitScreen()}
        />,
      ]}
    >
      <Layout.ScrollView
        style={{ flex: 1 }}
      >
        <Layout.Button
          title={stringResources['Language']}
          onPress={() => goToLanguagesScreen()}
        />
        <Layout.Button
          title={stringResources['Theme']}
          onPress={() => goToThemeScreen()}
        />
      </Layout.ScrollView>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}
