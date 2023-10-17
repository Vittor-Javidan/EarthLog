import React, { useEffect } from 'react';
import * as Location from 'expo-location';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';
import CredentialService from '@Services/CredentialService';
import FileExportService from '@Services/FileExportService';

import { Layout } from '@Layout/index';

export default function Home() {

  useEffect(() => {
    initApp(() => navigate('HOME SCOPE'));
    // initApp(() => navigate('TEST SCOPE'));
  }, []);

  return <Layout.Loading />;
}

async function initApp(onFinish: () => void) {
  await FileExportService.createExportedFilesFolder();
  await CredentialService.createCredentialsFolder();
  await DatabaseService.createDatabaseFolder();
  await ConfigService.loadConfig();
  Location.requestForegroundPermissionsAsync();
  onFinish();
}
