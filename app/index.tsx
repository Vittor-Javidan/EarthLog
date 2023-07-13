import React, { useState, useEffect } from 'react';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';

import HomeScreen from './HomeScreen';
import LoadingScreen from './LoadingScreen';

export default function Home() {

  LogService.useLog('HOME SCREEN: App Started');
  const [isConfigLoaded, setConfigLoaded] = useState<boolean>(false);

  useEffect(() => {
    ConfigService.loadConfig(() => { setConfigLoaded(true); });
  }, []);

  if (!isConfigLoaded) {
    return <LoadingScreen />;
  }
  return <HomeScreen />;
}
