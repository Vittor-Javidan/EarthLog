import React, { memo, useMemo, useState } from 'react';
import { Modal as ReactNative_Modal, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCameraPermissions } from 'expo-camera';

import { CameraLayerConfig } from '@V2/Types/AppTypes';
import { CameraLayerAPI } from '@V2/Layers/API/Camera';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Camera } from './Camera';
import { PermissionScreen } from './PermissionScreen';

export const Layer_Camera = memo(() => {

  const [permission     , requestPermission ] = useCameraPermissions();
  const [showCamera     , setShowCamera     ] = useState<boolean>(false);
  const [cameraConfig   , setCameraConfig   ] = useState<CameraLayerConfig | null>(null);

  CameraLayerAPI.registerShowSetter(setShowCamera);
  CameraLayerAPI.registerConfigSetter(setCameraConfig);

  if (!showCamera || cameraConfig === null) {
    return <></>;
  }

  return (
    <ReactNative_Modal
      onRequestClose={() => CameraLayerAPI.closeCamera()}
      animationType="fade"
      statusBarTranslucent={true}
      transparent
      style={{
        flex: 1,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {permission === null ? (
          <LoadingFeedback />
        ) : (<>
          {permission.granted && (<>
            <Camera
              cameraConfig={cameraConfig}
              onBackPress={() => CameraLayerAPI.closeCamera()}
            />
          </>)}
          {!permission.granted && (
            <PermissionScreen
              permission={permission}
              onRequestPermission={async () => await requestPermission()}
            />
            )}
          </>
        )}
      </GestureHandlerRootView>
    </ReactNative_Modal>
  );
});

const LoadingFeedback = memo(() => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <ActivityIndicator
        size="large"
        color={theme.font}
        style={{ transform: [{ scale: 3 }] }}
      />
    </View>
  );
});