import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@Layout/index';

import AppRoutes from '@Globals/AppRoutes';
import { Languages } from '@Types/index';
import { translations } from '@Translations/index';
import { Translations_HomeScreen } from '@Translations/Screens/HomeScreen';

import ConfigService from '@Services/ConfigService';

export default function Drawer() {

  const navController = useRouter();
  const stringResources = useMemo<Translations_HomeScreen[Languages]>(
    () => translations.Screens.HomeScreen[ConfigService.config.language], []
  );

  return (
    <Layout.DrawerButton
      title={stringResources['Settings']}
      onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
    />
  );
}
