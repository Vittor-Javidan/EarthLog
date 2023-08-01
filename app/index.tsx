import React, { useState, useEffect } from 'react';
import { Redirect } from 'expo-router';
import LoadingScreen from './LoadingScreen';

import AppRoutes from '@Globals/AppRoutes';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function Home() {

  const [loadFinish, setLoadFinish] = useState<boolean>(false);

  useEffect(() => {
    initApp(() => setLoadFinish(true));
  }, []);

  if (!loadFinish) {
    return <LoadingScreen />;
  }
  return <Redirect href={AppRoutes.HOME} />;
}

async function initApp(onFinish: () => void) {
  await ConfigService.loadConfig();
  await ProjectService.loadDatabase();
  onFinish();
}
