import React, { memo, useCallback, useMemo, useState } from 'react';
import { Modal as ReactNative_Modal, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { CameraPreviewLayerAPI } from '../API/CameraPreview';
import { PreviewButtons } from './PreviewButtons';
import { ZoomableImage } from './ZoomImageAnimation';

export const Layer_CameraPreview = memo(() => {

  const [pictureUri     , setPictureUri     ] = useState<string | null>(null);
  const [showSaveButton , setShowSaveButton ] = useState<boolean>(false)

  CameraPreviewLayerAPI.registerPictureUriSetter(setPictureUri);
  CameraPreviewLayerAPI.registerShowSaveButtonSetter(setShowSaveButton)

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
      statusBarTranslucent
      backdropColor={'#000'}
      style={{ flex: 1 }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {pictureUri ? (<>
          {/* <Image
            source={{ uri: pictureUri }}
            style={{
              flex: 1,
              resizeMode: 'contain',
              backgroundColor: ''
            }}
          /> */}
          <ZoomableImage
            pictureUri={pictureUri}
            minScale={0.5}
            maxScale={10}
          />
          <PreviewButtons
            showSaveButton={showSaveButton}
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
