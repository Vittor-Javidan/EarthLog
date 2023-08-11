import React, { useEffect } from 'react';

import ConfigService from '@Services/ConfigService';
import DatabaseService from '@Services/DatabaseService';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';

export default function Home() {

  useEffect(() => {
    initApp(async () => await useNavigate('HOME SCREEN'));
  }, []);

  return <Layout.Loading />;
}

async function initApp(onFinish: () => void) {
  await ConfigService.loadConfig();
  await DatabaseService.createDatabase();
  onFinish();
}
