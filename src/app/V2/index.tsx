import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppService } from '@V2/Services/AppService';

import { CameraPreviewLayer } from '@V2/Layers/CameraPreview';
import { CameraLayer } from '@V2/Layers/Camera';
import { PopUpLayer } from '@V2/Layers/PopUp';
import { ScopeController } from '@V2/Scopes/controller';
import { MapLayer } from '@V2/Layers/Map';
import { NotificationLayer } from '@V2/Layers/NotificationLayer';

export default function LTS_VERSION_2() {

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
      <NotificationLayer />
      <ScopeController />
    </>)}
  </>);
}

async function initApp(onInitialized: () => void) {
  await AppService.initApp();
  onInitialized();
}
