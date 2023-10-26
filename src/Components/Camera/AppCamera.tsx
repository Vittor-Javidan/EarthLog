import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, LayoutRectangle, Pressable } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';

import { Button } from '@Button/index';
import { PhotoPreview } from './PhotoPreview';
import CameraService from '@Services/CameraService';

export const AppCamera = memo((props: {
  id_project: string
  onBackPress: () => void
}) => {

  const cameraRef = useRef<Camera>(null);
  const [previewDimensions, setPreviewDimensions] = useState<LayoutRectangle>({ height: 0, width: 0, x: 0, y: 0});
  const [cameraType       , setCameraType       ] = useState<CameraType>(CameraType.back);
  const [flashMode        , setFlashMode        ] = useState<FlashMode>(FlashMode.off);
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
    if (cameraRef.current !== null && show.loadingPreview === false) {
      setShow(prev => ({ ...prev, loadingPreview: true}));
      setPhoto(await cameraRef.current.takePictureAsync());
    }
  }, [cameraRef, show.loadingPreview]);

  const onConfirm = useCallback(() => {
    if (photo?.uri) {
      CameraService.savePicture(props.id_project, photo.uri);
      setShow(prev => ({ ...prev, loadingPreview: false }));
      setPhoto(null);
    }
  }, [props.id_project, photo]);

  const onCancel = useCallback(() => {
    setPhoto(null);
    setShow(prev => ({ ...prev, loadingPreview: false }));
  }, []);

  const changeCameraType = useCallback((cameraType: CameraType) => {
    setCameraType(cameraType === CameraType.front ? CameraType.back : CameraType.front);
  }, []);

  const changeFlashMode = useCallback((flashMode: FlashMode) => {
    setFlashMode(flashMode === FlashMode.off ? FlashMode.on : FlashMode.off);
  }, []);

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
        type={cameraType}
        flashMode={flashMode}
        ratio="16:9"
        style={{
          aspectRatio: 9 / 16,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Pressable
          onPress={async () => await takePicture()}
          style={{ flex: 1 }}
        />
      </Camera>
      {show.loadingPreview ? (
        <PhotoPreview
          photo={photo}
          dimensions={previewDimensions}
          onCancel={() => onCancel()}
          onConfirm={() =>  onConfirm()}
        />
      ) : (<>
        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            opacity: 0.5,
          }}
        >
          <Button.Icon
            iconName="close"
            onPress={() => props.onBackPress()}
            theme={{
              font: '#DDD',
              font_Pressed: '#666',
              background: '#666',
              background_Pressed: '#222',
            }}
            style={{
              backgroundColor: undefined,
              height: 50,
              width: 50,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            gap: 10,
            opacity: 0.5,
          }}
        >
          <Button.Icon
            iconName={flashMode === FlashMode.on ? 'flash-off' : 'flash'}
            onPress={() => changeFlashMode(flashMode)}
            theme={{
              font: '#DDD',
              font_Pressed: '#666',
              background: '#666',
              background_Pressed: '#222',
            }}
            style={{
              backgroundColor: undefined,
              height: 50,
              width: 50,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          />
          <Button.Icon
            iconName="camera-reverse"
            onPress={() => changeCameraType(cameraType)}
            theme={{
              font: '#DDD',
              font_Pressed: '#666',
              background: '#666',
              background_Pressed: '#222',
            }}
            style={{
              backgroundColor: undefined,
              height: 50,
              width: 50,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          />
        </View>
      </>)}
    </View>
  );
});
