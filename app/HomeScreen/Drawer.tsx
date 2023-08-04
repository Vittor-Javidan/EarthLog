import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@Layout/index';

import AppRoutes from '@Globals/AppRoutes';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function Drawer() {

  const navController = useRouter();
  const stringResources = useMemo(
    () => translations.Screens.HomeScreen[ConfigService.config.language], []
  );

  return (
    <Layout.DrawerButton
      title={stringResources['Settings']}
      onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
    />
  );
}
