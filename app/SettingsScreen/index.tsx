
import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import Layout from '../../Components/Layout';
import Layout_DrawerButton from '../../Components/Layout_DrawerButton';
import Layout_Content from '../../Components/Layout_Content';
import Layout_Button from '../../Components/Layout_Button';
import LogService from '../../Services/LogService';
import ConfigService from '../../Services/ConfigService';
import { ConfigScreenTranslations, languages } from './translations';
import { Languages } from '../../Types/LanguageTypes';
import AppRoutes from '../Routes';

export default function ConfigScreen(): JSX.Element {

  LogService.useLog('CONFIG SCREEN: rendered');

  const navController = useRouter();
  const stringResources = useMemo<ConfigScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  return (
    <Layout
      title={stringResources['Settings']}
      drawerChildren={<>
        <Layout_DrawerButton
          title={stringResources['Main Screen']}
          onPress={() => navController.push(AppRoutes.MAIN_SCREEN)}
        />
      </>}
    >
      <Layout_Content
        style={{ flex: 1 }}
      >
        <Layout_Button
          title={stringResources['Language']}
          onPress={() => navController.push(AppRoutes.SS_LANGUAGES_SCREEN)}
        />
        <Layout_Button
          title={stringResources['Theme']}
          onPress={() => navController.push(AppRoutes.SS_THEME_SCREEN)}
        />
      </Layout_Content>
      <Layout_Content>
        <Layout_Button
          title={stringResources['Main Screen']}
          onPress={() => navController.push(AppRoutes.MAIN_SCREEN)}
        />
      </Layout_Content>
    </Layout>
  );
}
