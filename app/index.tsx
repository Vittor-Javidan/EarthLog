import React, { useState, useEffect } from 'react';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';

import LoadingScreen from './LoadingScreen';
import { Redirect } from 'expo-router';
import AppRoutes from '@Globals/AppRoutes';

export default function Home() {

  LogService.useLog('HOME SCREEN: App Started');
  const [isConfigLoaded, setConfigLoaded] = useState<boolean>(false);

  useEffect(() => {
    ConfigService.loadConfig(() => { setConfigLoaded(true); });
  }, []);

  if (!isConfigLoaded) {
    return <LoadingScreen />;
  }
  return <Redirect href={AppRoutes.HOME} />;
}
