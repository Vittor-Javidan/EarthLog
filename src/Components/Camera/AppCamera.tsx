import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, LayoutRectangle } from 'react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';

import { Button } from '@Button/index';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import { PhotoPreview } from './PhotoPreview';

export const AppCamera = memo(() => {

  const cameraRef = useRef<Camera>(null);
  const config    = useMemo(() => ConfigService.config, []);
  const theme     = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  const [previewDimensions, setPreviewDimensions] = useState<LayoutRectangle>({ height: 0, width: 0, x: 0, y: 0});
  const [photo            , setPhoto            ] = useState<CameraCapturedPicture | null>(null);
  const [show             , setShow             ] = useState({
    loadingPreview: false,
  });

  useEffect(() => {
    if (show.loadingPreview && photo !== null) {
      setShow(prev => ({ ...prev, loadingPreview: false}));
    }
  }, [show.loadingPreview]);

  const takePicture = useCallback(async () => {
    if (cameraRef.current !== null) {
      setShow(prev => ({ ...prev, loadingPreview: true}));
      setPhoto(await cameraRef.current.takePictureAsync());
    }
  }, [cameraRef]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
      }}
      onLayout={(e) => setPreviewDimensions(e.nativeEvent.layout)}
    >
      <Camera
        ref={cameraRef}
        ratio="16:9"
        style={{
          aspectRatio: 9 / 16,
          height: '100%',
          overflow: 'hidden',
        }}
      />
      {show.loadingPreview ? (
        <PhotoPreview
          photo={photo}
          dimensions={previewDimensions}
        />
      ) : (<>
        <Button.Icon
          iconName="camera"
          onPress={async () => await takePicture()}
          theme={{
            font: theme.font_Button,
            font_Pressed: theme.background_active,
            background: theme.background_Button,
            background_Pressed: theme.background_active,
          }}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            height: 70,
            width: 70,
            borderRadius: 35,
            paddingHorizontal: 5,
            paddingVertical: 5,
            bottom: 10,
            opacity: 0.3,
          }}
        />
      </>)}
    </View>
  );
});
