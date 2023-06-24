import React, { useMemo } from 'react';
import {Text} from 'react-native';
import { useRouter } from 'expo-router';

import Layout from '../../Components/Layout';
import LayoutDrawerButton from '../../Components/LayoutDrawerButton';

import LogService from '../../Services/LogService';
import LanguageService from '../../Services/LanguageService';

import APPColors from '../../Globals/Colors';
import { MainScreenTranslations, languages } from './translations';
import { Languages } from '../../Types/LanguageTypes';

export default function MainScreen(): JSX.Element {

  LogService.useLog('MAIN SCREEN: rendered');
  const navController = useRouter();
  const stringResources = useMemo<MainScreenTranslations[Languages]>(
    () => languages[LanguageService.getDeviceLanguage()], []
  );

  return (
    <Layout
      title="Earth Log"
      drawerChildren={<>
        <LayoutDrawerButton
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
