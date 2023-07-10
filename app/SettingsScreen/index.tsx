
import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '../../Components/Layout';

import LogService from '../../Services/LogService';
import ConfigService from '../../Services/ConfigService';

import AppRoutes from '../Routes';
import { ConfigScreenTranslations, languages } from './translations';
import { Languages } from '../../Types/LanguageTypes';

export default function ConfigScreen(): JSX.Element {

  LogService.useLog('CONFIG SCREEN: rendered');

  const navController = useRouter();
  const stringResources = useMemo<ConfigScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  return (
    <Layout.Root
      title={stringResources['Settings']}
      iconName="settings"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.PROJECTS_SCREEN)}
        />,
      ]}
    >
      <Layout.ScrollView
        style={{ flex: 1 }}
      >
        <Layout.Button
          title={stringResources['Language']}
          onPress={() => navController.push(AppRoutes.SS_LANGUAGES_SCREEN)}
        />
        <Layout.Button
          title={stringResources['Theme']}
          onPress={() => navController.push(AppRoutes.SS_THEME_SCREEN)}
        />
      </Layout.ScrollView>
      <Layout.View>
        <Layout.Button
          title={stringResources['Back']}
          onPress={() => navController.push(AppRoutes.PROJECTS_SCREEN)}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}
