import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppService } from '@V1/Services/AppService';

import { CameraPreviewLayer } from '@V1/Layers/CameraPreview';
import { CameraLayer } from '@V1/Layers/Camera';
import { PopUpLayer } from '@V1/Layers/PopUp';
import { ScopeController } from '@V1/Scopes/controller';
import { MapLayer } from '@V1/Layers/Map';

export default function LTS_VERSION_1() {

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initApp(() => setInitialized(true));
  }, []);

  return (<>
    {initialized && (<>
      <StatusBar hidden={false} style={'dark'} />
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
