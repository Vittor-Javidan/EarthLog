import React, { memo, useMemo, useState } from 'react';
import { Modal as ReactNative_Modal, Dimensions, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';

import { CameraLayerConfig } from '@Types/AppTypes';
import CameraService from '@Services/CameraService';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { AppCamera } from './AppCamera';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

export const CameraLayer = memo(() => {

  const config    = useMemo(() => ConfigService.config, []);
  const theme     = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [permission, requestPermission ] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera     ] = useState<boolean>(false);
  const [_         , setCameraConfig   ] = useState<CameraLayerConfig>({
    id_project: '',
    mode: 'photo',
  });

  CameraService.registerShowSetter(setShowCamera);
  CameraService.registerConfigSetter(setCameraConfig);

  return showCamera ? (
    <ReactNative_Modal
      onRequestClose={() => setShowCamera(false)}
      animationType="slide"
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
          {permission.granted ? (
            <AppCamera
              onBackPress={() => setShowCamera(false)}
            />
          ) : (
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
                    font: theme.font_Button,
                    font_Pressed: theme.background_active,
                    background: theme.background_Button,
                    background_Pressed: theme.background_active,
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
