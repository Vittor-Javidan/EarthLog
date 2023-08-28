import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import { Layout } from '@Components/Layout';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';

export default function Home() {

  useEffect(() => {
    initApp(() => navigate('HOME SCREEN'));
  }, []);

  return <Layout.Loading />;
}

async function initApp(onFinish: () => void) {
  await ConfigService.loadConfig();
  await DatabaseService.createDatabase();
  await Location.requestForegroundPermissionsAsync();
  onFinish();
}
