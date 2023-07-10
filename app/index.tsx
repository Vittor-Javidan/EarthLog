import React, { useState, useMemo } from 'react';
import { Text, View } from 'react-native';
import { Redirect } from 'expo-router';

import AppRoutes from '@AppRoutes/Routes';
import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';

import { InitializationScreenTranslations, languages } from './translations';

export default function Home() {

  LogService.useLog('HOME SCREEN: App Started');

  const configService = useMemo<ConfigService>(() => new ConfigService(), []);
  const [isConfigLoaded, setConfigLoaded] = useState<boolean>(false);

  configService.useLoadConfig(() => {
    setConfigLoaded(true);
  });

  if (!isConfigLoaded) {
    return <InitializationScreen />;
  }
  return <Redirect href={AppRoutes.PROJECTS_SCREEN} />;
}

function InitializationScreen(): JSX.Element {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<InitializationScreenTranslations[Languages]>(
    () => languages[ConfigService.config.language], []
  );

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          fontSize: 36,
          color: theme.onBackground,
        }}
      >
        {stringResources['Loading...']}
      </Text>
    </View>
  );
}

