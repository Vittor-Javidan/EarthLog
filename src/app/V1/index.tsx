import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppService } from '@V1/Services/AppService';

import { Layer_CameraPreview } from '@V1/Layers/CameraPreview';
import { Layer_Camera } from '@V1/Layers/Camera';
import { Layer_PopUp } from '@V1/Layers/PopUp';
import { ScopeController } from '@V1/Scopes/controller';
import { Layer_Compass } from '@V1/Layers/Compass';
import { Layer_Map } from '@V1/Layers/Map';
import { Layer_MapMarkerSelection } from '@V1/Layers/Map_MarkeSelection';
import { Layer_Notification } from '@V1/Layers/NotificationLayer';
import { Layer_Tutorial } from '@V1/Layers/TutorialLayer';
import { LayerButtons } from '@V1/Layers/LayerButtons';

export default function LTS_VERSION_1() {

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initApp(() => setInitialized(true));
  }, []);

  return (<>
    {initialized && (<>
      <StatusBar hidden={false} style={'dark'} />
      <Layer_PopUp />
      <Layer_Camera />
      <Layer_CameraPreview />
      <Layer_Compass />
      <Layer_Map />
      <Layer_MapMarkerSelection />
      <Layer_Notification />
      <Layer_Tutorial />
      <LayerButtons />
      <ScopeController />
    </>)}
  </>);
}

async function initApp(onInitialized: () => void) {
  await AppService.initApp();
  onInitialized();
}
