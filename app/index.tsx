import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import LogService from '../Services/LogService';
import ConfigService from '../Services/ConfigService';
import APPColors from '../Globals/Colors';
import { AppInitializationScreenTranslations, languages } from './translations';
import LanguageService, { Languages } from '../Services/LanguageService';

export default function Home() {

  LogService.useLog('HOME SCREEN: App Started');
  const configService = useMemo<ConfigService>(() => new ConfigService(), []);
  const stringResources = useMemo<AppInitializationScreenTranslations[Languages]>(
    () => languages[LanguageService.getDeviceLanguage()], []
  );
  const [isConfigLoaded, setConfigLoaded] = useState<boolean>(false);

  configService.useLoadConfig(() => {
    setConfigLoaded(true);
  });

  return <>
    {isConfigLoaded ? (
      <Redirect href={'/MainScreen'} />
    ) : (
      <View
        style={{
          backgroundColor: APPColors.background,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          style={{
            fontSize: 36,
            color: APPColors.onBackground,
          }}
        >
          {stringResources['Loading...']}
        </Text>
      </View>
    )}
  </>;
}
