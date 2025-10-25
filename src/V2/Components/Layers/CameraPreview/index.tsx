import React, { memo, useCallback, useMemo, useState } from 'react';
import { Modal as ReactNative_Modal, View, ActivityIndicator, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { CameraPreviewLayerAPI } from '../API/CameraPreview';
import { PreviewButtons } from './PreviewButtons';

export const CameraPreviewLayer = memo(() => {

  const [pictureUri , setPictureUri]  = useState<string | null>(null);

  CameraPreviewLayerAPI.registerPictureUriSetter(setPictureUri);

  const onSavePicture = useCallback(() => {
    if (pictureUri) {
      CameraPreviewLayerAPI.savePicture();
      CameraPreviewLayerAPI.closePreview();
    }
  }, [pictureUri]);

  if (pictureUri === null) {
    return <></>;
  }

  return (
    <ReactNative_Modal
      onRequestClose={() => CameraPreviewLayerAPI.closePreview()}
      animationType="fade"
      statusBarTranslucent={true}
      backdropColor={'#000'}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {pictureUri ? (<>
          <Image
            source={{ uri: pictureUri }}
            style={{
              flex: 1,
              resizeMode: 'contain',
              backgroundColor: ''
            }}
          />
          <PreviewButtons
            onConfirm={() => onSavePicture()}
            onCancel={() => CameraPreviewLayerAPI.closePreview()}
          />
        </>) : (
          <LoadingFeedback />
        )}
      </GestureHandlerRootView>
    </ReactNative_Modal>
  )
})

const LoadingFeedback = memo(() => {
  const config    = useMemo(() => ConfigService.config, []);
  const theme     = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
