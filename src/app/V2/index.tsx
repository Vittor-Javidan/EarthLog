import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppService } from '@V2/Services/AppService';

import { CameraPreviewLayer } from '@V2/Layers/CameraPreview';
import { CameraLayer } from '@V2/Layers/Camera';
import { PopUpLayer } from '@V2/Layers/PopUp';
import { ScopeController } from '@V2/Scopes/controller';
import { MapLayer } from '@V2/Layers/Map';
import DevTools from '@DevTools';

export default function Home_LTS_VERSION_2() {

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initApp(() => setInitialized(true));
  }, []);

  DevTools.useLog('LTS_VERSION_2 rendered.');

  return (<>
    {initialized && (<>
      <StatusBar style="auto" />
      <PopUpLayer />
      <CameraLayer />
      <CameraPreviewLayer />
      <MapLayer />
      <ScopeController />
    </>)}
  </>);
}

async function initApp(onInitialized: () => void) {
  await AppService.initApp();
  onInitialized();
}
