import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, LayoutRectangle, Pressable } from 'react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as Sharing from 'expo-sharing';

import { Button } from '@Button/index';
import { PhotoPreview } from './PhotoPreview';

export const AppCamera = memo((props: {
  onBackPress: () => void
}) => {

  const cameraRef = useRef<Camera>(null);
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
    if (cameraRef.current !== null && show.loadingPreview === false) {
      setShow(prev => ({ ...prev, loadingPreview: true}));
      setPhoto(await cameraRef.current.takePictureAsync());
    }
  }, [cameraRef, show.loadingPreview]);

  const onConfirm = useCallback(async () => {
    if (photo?.uri) {
      await Sharing.shareAsync(photo?.uri);
    }
  }, [photo]);

  const onCancel = useCallback(() => {
    setPhoto(null);
    setShow(prev => ({ ...prev, loadingPreview: false }));
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
          onConfirm={async () =>  await onConfirm()}
        />
      ) : (<>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
            gap: 10,
            width: '100%',
          }}
        >
          <Button.RoundedIcon
            iconName="arrow-down"
            onPress={() => props.onBackPress()}
            theme={{
              font: '#DDD',
              font_Pressed: '#666',
              background: '#666',
              background_Pressed: '#222',
            }}
            buttonDiameter={70}
            showPlusSign={false}
          />
        </View>
      </>)}
    </View>
  );
});
