
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import Layout from '../../Components/Layout';
import DrawerButton from '../../Components/DrawerButton';
import LogService from '../../Services/LogService';
import APPColors from '../../Globals/Colors';
import LanguageService, { Languages } from '../../Services/LanguageService';
import { ConfigScreenTranslations, languages } from './translations';

export default function ConfigScreen(): JSX.Element {
  LogService.useLog('CONFIG SCREEN: renderizado');

  const navController = useRouter();
  const stringResources = useMemo<ConfigScreenTranslations[Languages]>(
    () => languages[LanguageService.getDeviceLanguage()], []
  );

  return (
    <Layout
      title={stringResources['Settings']}
      drawerChildren={<>
        <DrawerButton
          title={stringResources['Main Screen']}
          onPress={() => navController.push('/MainScreen')}
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
