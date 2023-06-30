import React, { useMemo } from 'react';
import {Text} from 'react-native';
import { useRouter } from 'expo-router';

import Layout from '../../Components/Layout';
import Layout_DrawerButton from '../../Components/Layout_DrawerButton';

import LogService from '../../Services/LogService';

import APPColors from '../../Globals/Colors';
import { MainScreenTranslations, languages } from './translations';
import { Languages } from '../../Types/LanguageTypes';
import ConfigService from '../../Services/ConfigService';

export default function MainScreen(): JSX.Element {

  LogService.useLog('MAIN SCREEN: rendered');

  const navController = useRouter();
  const stringResources = useMemo<MainScreenTranslations[Languages]>(
    () => languages[ConfigService.config.language], []
  );

  return (
    <Layout
      title="Earth Log"
      drawerChildren={<>
        <Layout_DrawerButton
          title={stringResources['Settings']}
          onPress={() => navController.push('/ConfigScreen')}
        />
      </>}
    >
      <Text
        style={{
          color: APPColors.onBackground,
        }}
      >
        Content
      </Text>
    </Layout>
  );
}
