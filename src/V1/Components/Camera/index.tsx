import React, { memo, useMemo, useState } from 'react';
import { Modal as ReactNative_Modal, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCameraPermissions } from 'expo-camera';

import { CameraLayerConfig } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import CameraService from '@V1/Services/CameraService';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Text } from '@V1/Text/index';
import { Button } from '@V1/Button/index';
import { AppCamera } from './AppCamera';

export const CameraLayer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.component.camera[config.language], []);
  const [permission  , requestPermission] = useCameraPermissions();
  const [showCamera  , setShowCamera    ] = useState<boolean>(false);
  const [cameraConfig, setCameraConfig  ] = useState<CameraLayerConfig | null>(null);

  CameraService.registerShowSetter(setShowCamera);
  CameraService.registerConfigSetter(setCameraConfig);

  return (showCamera && cameraConfig !== null) ? (
    <ReactNative_Modal
      onRequestClose={() => CameraService.closeCamera()}
      animationType="fade"
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
                backgroundColor: theme.background,
                padding: 50,
                gap: 10,
              }}
            >
              <Text h1
                style={{
                  color: theme.font,
                  textAlign: 'center',
                }}
              >
                {R['Camera permission denied']}
              </Text>
              {permission.canAskAgain ? (
                <Button.TextWithIcon
                  title={R['Grant permission']}
                  iconName="camera"
                  onPress={async () => await requestPermission()}
                  theme={{
                    font:              theme.font_Button,
                    font_active:       theme.font_active,
                    background:        theme.background_Button,
                    background_active: theme.background_active,
                  }}
                  style={{
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Text h1
                  style={{
                    color: theme.font,
                  }}
                >
                  {R['Please give camera access permission on your phone settings']}
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
