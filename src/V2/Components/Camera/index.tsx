import React, { memo, useMemo, useState } from 'react';
import { Modal as ReactNative_Modal, Dimensions, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';

import { CameraLayerConfig } from '@V2/Types/AppTypes';
import CameraService from '@V2/Services/CameraService';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Text } from '@V2/Text/index';
import { Button } from '@V2/Button/index';
import { AppCamera } from './AppCamera';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const CameraLayer = memo(() => {

  const config    = useMemo(() => ConfigService.config, []);
  const theme     = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [permission  , requestPermission] = Camera.useCameraPermissions();
  const [showCamera  , setShowCamera    ] = useState<boolean>(false);
  const [cameraConfig, setCameraConfig  ] = useState<CameraLayerConfig | null>(null);

  CameraService.registerShowSetter(setShowCamera);
  CameraService.registerConfigSetter(setCameraConfig);

  return (showCamera && cameraConfig !== null) ? (
    <ReactNative_Modal
      onRequestClose={() => CameraService.closeCamera()}
      animationType="fade"
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
      statusBarTranslucent={true}
      transparent
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {permission === null ? (
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
        ) : (<>
          {permission.granted ? (<>
            {cameraConfig.mode === 'photo' && (
              <AppCamera
                cameraConfig={cameraConfig}
                onBackPress={() => CameraService.closeCamera()}
              />
            )}
          </>) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                padding: 50,
              }}
            >
              <Text h1>
                Camera permission denied
              </Text>
              {permission.canAskAgain ? (
                <Button.TextWithIcon
                  title="Grant permission"
                  iconName="camera"
                  onPress={async () => await requestPermission()}
                  theme={{
                    font:              theme.font_Button,
                    font_active:       theme.background_active,
                    background:        theme.background_Button,
                    background_active: theme.background_active,
                  }}
                  style={{
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Text h1>
                  Please give permission on your phone settings
                </Text>
              )}
            </View>
            )}
          </>
        )}
      </GestureHandlerRootView>
    </ReactNative_Modal>
  ) : <></>;
});
