import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';

import AppRoutes from '@AppRoutes/Routes';
import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';

import { Layout } from '@Components/Layout';
import { MainScreenTranslations, languages } from './translations';

export default function ProjectsScreen(): JSX.Element {

  LogService.useLog('PROJECTS SCREEN: rendered');

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<MainScreenTranslations[Languages]>(
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
      <Layout.View>
        <Layout.Button
          title={stringResources['New Project']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => navController.push(AppRoutes.PS_CREATION_SCREEN)}
        />
      </Layout.View>
    </Layout.Root>
  );
}

function Drawer() {

  const navController = useRouter();
  const stringResources = useMemo<MainScreenTranslations[Languages]>(
    () => languages[ConfigService.config.language], []
  );

  return (
    <Layout.DrawerButton
      title={stringResources['Settings']}
      onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
    />
  );
}
