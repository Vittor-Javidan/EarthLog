import React, { useState, useMemo } from 'react';
import { Redirect } from 'expo-router';

import LogService from '../Services/LogService';
import ConfigService from '../Services/ConfigService';

import InitializationScreen from './InitializationScreen';

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
  return <Redirect href={'/MainScreen'} />;
}
