import React, { useMemo } from 'react';
import {Text} from 'react-native';
import Layout from '../../Components/Layout';
import DrawerButton from '../../Components/DrawerButton';
import { useRouter } from 'expo-router';
import LogService from '../../Services/LogService';
import APPColors from '../../Globals/Colors';
import { MainScreenTranslations, languages } from './translations';
import LanguageService, { Languages } from '../../Services/LanguageService';

export default function MainScreen(): JSX.Element {

  LogService.useLog('MAIN SCREEN: renderizado');
  const navController = useRouter();
  const stringResources = useMemo<MainScreenTranslations[Languages]>(
    () => languages[LanguageService.getDeviceLanguage()], []
  );

  return (
    <Layout
      title="Earth Log"
      drawerChildren={<>
        <DrawerButton
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
