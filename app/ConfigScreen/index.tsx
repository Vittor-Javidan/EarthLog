
import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';

import Layout from '../../Components/Layout';
import LayoutDrawerButton from '../../Components/LayoutDrawerButton';
import LayoutContent from '../../Components/LayoutContent';
import LayoutButton from '../../Components/LayoutButton';

import LogService from '../../Services/LogService';
import ConfigService from '../../Services/ConfigService';

import { ConfigScreenTranslations, languages } from './translations';
import { Languages } from '../../Types/LanguageTypes';

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
        <LayoutDrawerButton
          title={stringResources['Main Screen']}
          onPress={() => navController.push('/MainScreen')}
        />
      </>}
    >
      <LayoutContent>
        <LayoutButton
          title={stringResources['Language']}
          onPress={() => navController.push('/AvailableLanguagesScreen')}
        />
      </LayoutContent>
    </Layout>
  );
}
