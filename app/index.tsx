import React, { useState, useEffect } from 'react';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';

import LoadingScreen from './LoadingScreen';
import { Redirect } from 'expo-router';
import AppRoutes from '@Globals/AppRoutes';
import ProjectService from '@Services/ProjectService';

export default function Home() {

  LogService.useLog('HOME SCREEN: App Started');
  const [isConfigLoaded, setConfigLoaded] = useState<boolean>(false);
  const [isAllProjectSettingsLoaded, setIsAllProjectSettingsLoaded] = useState<boolean>(false);

  const loadComplete = isConfigLoaded && isAllProjectSettingsLoaded;

  useEffect(() => {
    ConfigService.loadConfig(() => setConfigLoaded(true));
    ProjectService.loadAllProjectSettings(() => setIsAllProjectSettingsLoaded(true));
  }, []);

  console.log(ProjectService.allProjectSettings);

  if (!loadComplete) {
    return <LoadingScreen />;
  }
  return <Redirect href={AppRoutes.HOME} />;
}
