import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';

import { Layout } from '@Layout/index';
import CredentialService from '@Services/CredentialService';

export default function Home() {

  useEffect(() => {
    initApp(() => navigate('HOME SCOPE'));
    // initApp(() => navigate('TEST SCOPE'));
  }, []);

  return <Layout.Loading />;
}

async function initApp(onFinish: () => void) {
  await ConfigService.loadConfig();
  await DatabaseService.createDatabaseFolder();
  await CredentialService.createCredentialsFolder();
  await Location.requestForegroundPermissionsAsync();
  onFinish();
}
