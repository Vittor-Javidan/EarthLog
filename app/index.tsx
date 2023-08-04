import React, { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';
import { useNavigate } from './GlobalHooks';

export default function Home() {

  useEffect(() => {
    initApp(async () => await useNavigate('HOME SCREEN'));
  }, []);

  return <LoadingScreen />;
}

async function initApp(onFinish: () => void) {
  await ConfigService.loadConfig();
  await DatabaseService.createDatabase();
  onFinish();
}
