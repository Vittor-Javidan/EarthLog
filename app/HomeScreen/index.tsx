import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';

import LogService from '@Services/LogService';
import { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import { Languages } from '@Services/LanguageService';

import { Layout } from '@Components/Layout';
import { HomeScreenTranslations, languages } from './translations';
import AppRoutes from '@AppRoutes/Routes';

export default function HomeScreen() {

  LogService.useLog('PROJECTS SCREEN: rendered');

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<HomeScreenTranslations[Languages]>(
    () => languages[ConfigService.config.language], []
  );

  return (
    <Layout.Root
      title="Earth Log"
      iconName="md-menu-sharp"
      showNavigationTree={false}
      drawerChildren={<Drawer />}
    >
      <Layout.ScrollView>
        {/* TODO: Render buttons wich represents individual projects */}
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title={stringResources['New Project']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => navController.push(AppRoutes.PROJECT_CREATION_SCREEN)}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {

  const navController = useRouter();
  const stringResources = useMemo<HomeScreenTranslations[Languages]>(
    () => languages[ConfigService.config.language], []
  );

  return (
    <Layout.DrawerButton
      title={stringResources['Settings']}
      onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
    />
  );
}
