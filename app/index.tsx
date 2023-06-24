import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';
import LogService from '../Services/LogService';
import ConfigService from '../Services/ConfigService';
import APPColors from '../Globals/Colors';

export default function Home() {

  LogService.useLog('App Iniciado');
  const configService = useMemo<ConfigService>(() => new ConfigService(), []);
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
          Carregando...
        </Text>
      </View>
    )}
  </>;
}
