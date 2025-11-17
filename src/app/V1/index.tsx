import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppService } from '@V1/Services/AppService';

import { CameraPreviewLayer } from '@V1/Layers/CameraPreview';
import { CameraLayer } from '@V1/Layers/Camera';
import { PopUpLayer } from '@V1/Layers/PopUp';
import { ScopeController } from '@V1/Scopes/controller';
import { CompassLayer } from '@V1/Layers/Compass';
import { MapLayer } from '@V1/Layers/Map';
import { Map_MarkeSelectionLayer } from '@V1/Layers/Map_MarkeSelection';
import { NotificationLayer } from '@V1/Layers/NotificationLayer';
import { TutorialLayer } from '@V1/Layers/TutorialLayer';
import { LayerButtons } from '@V1/Layers/LayerButtons';

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
      <CompassLayer />
      <MapLayer />
      <Map_MarkeSelectionLayer />
      <NotificationLayer />
      <TutorialLayer />
      <LayerButtons />
      <ScopeController />
    </>)}
  </>);
}

async function initApp(onInitialized: () => void) {
  await AppService.initApp();
  onInitialized();
}
