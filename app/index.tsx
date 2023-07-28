import React, { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';
import LoadingScreen from './LoadingScreen';

import AppRoutes from '@Globals/AppRoutes';

import LogService from '@Services/LogService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function Home() {

  LogService.useLog('HOME SCREEN: App Started');
  const [isConfigLoaded, setConfigLoaded] = useState<boolean>(false);
  const [isAllProjectSettingsLoaded, setIsAllProjectSettingsLoaded] = useState<boolean>(false);

  const loadComplete = isConfigLoaded && isAllProjectSettingsLoaded;

  useEffect(() => {
    ConfigService.loadConfig(() => setConfigLoaded(true));
    ProjectService.loadAllProjectSettings(async () => {
      if (ProjectService.lastLoadedProject.id_project !== '') {
        await ProjectService.loadAllSampleSettings(ProjectService.lastLoadedProject.id_project);
      }
      setIsAllProjectSettingsLoaded(true);
    });
  }, []);

  console.log(ProjectService.allProjectSettings);

  if (!loadComplete) {
    return <LoadingScreen />;
  }
  return <Redirect href={AppRoutes.HOME} />;
}
