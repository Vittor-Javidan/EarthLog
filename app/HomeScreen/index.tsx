import React, { useMemo } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout } from '@Layout/index';
import ProjectButtons from './ProjectButtons';

import AppRoutes from '@Globals/AppRoutes';
import { Languages, ThemeDTO } from '@Types/index';
import { translations } from '@Translations/index';
import { Translations_HomeScreen } from '@Translations/Screens/HomeScreen';

import ConfigService from '@Services/ConfigService';
import Drawer from './Drawer';
import useBackPress from 'app/GlobalHooks';

export default function HomeScreen() {

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_HomeScreen[Languages]>(
    () => translations.Screens.HomeScreen[ConfigService.config.language], []
  );

  useBackPress(() => {
    Alert.alert(
      stringResources['Hold on!'],
      stringResources['Want to exit?'],
      [
        {
          text: stringResources['NO'],
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: stringResources['YES'],
          onPress: () => BackHandler.exitApp(),
        },
      ]
    );
  });

  return (
    <Layout.Root
      title="Earth Log"
      iconName="md-menu-sharp"
      showNavigationTree={false}
      drawerChildren={<Drawer />}
    >
      <Layout.ScrollView>
        <ProjectButtons />
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
          onPress={() => {
            navController.push(AppRoutes.PROJECT_CREATION_SCREEN);
          }}
        />
      </Layout.View>
    </Layout.Root>
  );
}
