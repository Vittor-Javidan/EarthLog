import React, { useMemo } from 'react';
import {Text} from 'react-native';
import { useRouter } from 'expo-router';
import Layout from '../../Components/Layout';
import Layout_DrawerButton from '../../Components/Layout_DrawerButton';
import LogService from '../../Services/LogService';
import ConfigService from '../../Services/ConfigService';
import { ThemeDTO } from '../../Services/ThemeService';
import { MainScreenTranslations, languages } from './translations';
import { Languages } from '../../Types/LanguageTypes';
import AppRoutes from '../Routes';

export default function MainScreen(): JSX.Element {

  LogService.useLog('MAIN SCREEN: rendered');

  const navController = useRouter();
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<MainScreenTranslations[Languages]>(
    () => languages[ConfigService.config.language], []
  );

  return (
    <Layout
      title="Earth Log"
      drawerChildren={<>
        <Layout_DrawerButton
          title={stringResources['Settings']}
          onPress={() => navController.push(AppRoutes.SETTINGS_SCREEN)}
        />
      </>}
    >
      <Text
        style={{
          color: theme.onBackground,
        }}
      >
        Content
      </Text>
    </Layout>
  );
}
