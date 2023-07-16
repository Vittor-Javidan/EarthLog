
import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';

import AppRoutes from '@Globals/AppRoutes';
import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import { Languages } from '@Services/LanguageService';

import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';

import { ConfigScreenTranslations, languages } from './translations';

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
        <Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.HOME)}
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
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title={stringResources['Back']}
          onPress={() => navController.push(AppRoutes.HOME)}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {
  return <></>;
}
