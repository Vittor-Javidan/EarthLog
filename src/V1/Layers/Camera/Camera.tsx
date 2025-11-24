import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, Pressable } from 'react-native';
import { CameraView, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import { Orientation, lockAsync, OrientationLock, addOrientationChangeListener, getOrientationAsync } from 'expo-screen-orientation';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  CameraPictureMode
} from '@V1/Types';

import { CameraLayerAPI } from '@V1/Layers/API/Camera';
import { useCameraPreviewLayer } from '@V1/Layers/API/CameraPreview';
import { IDService } from '@V1/Services_Core/IDService';
import { MediaService } from '@V1/Services/MediaService';

import { Button } from '@V1/Button/index';
import { Text } from '@V1/Text/index';

export const Camera = memo((props: {
  cameraConfig: CameraPictureMode
  onBackPress: () => void
}) => {
  const cameraRef = useRef<CameraView>(null);
  const [cameraType       , setCameraType       ] = useState<CameraType>('back');
  const [orientation      , setOrientation      ] = useState<Orientation | null>(null);
  const [flashMode        , setFlashMode        ] = useState<FlashMode>('off');
  const [photo            , setPhoto            ] = useState<CameraCapturedPicture | null | undefined>(null);
  const [picturesAmount   , setPicturesAmount   ] = useState<number>(props.cameraConfig.picturesAmount);
  const [show             , setShow             ] = useState({
    loadingPreview: false,
  });

  const onPictureTake = useCallback(async () => {
    if (cameraRef.current !== null && show.loadingPreview === false) {
      setShow(prev => ({ ...prev, loadingPreview: true}));
      setPhoto(await cameraRef.current.takePictureAsync());
    }
  }, [cameraRef, show.loadingPreview]);

  const onConfirm = useCallback(() => {
    if (photo?.uri) {
      const id_picture = IDService.generateUuidV4();
      MediaService.savePictureFromURI({
        id_project: props.cameraConfig.id_project,
        id_picture: id_picture,
        photoUri: photo.uri,
        onSave: () => {
          CameraLayerAPI.triggerOnPictureTake(id_picture);
          setPicturesAmount(prev => prev + 1);
        },
      });
      setShow(prev => ({ ...prev, loadingPreview: false }));
      setPhoto(null);
    }
  }, [props.cameraConfig.id_project, photo]);

  const onCancel = useCallback(() => {
    setPhoto(null);
    setShow(prev => ({ ...prev, loadingPreview: false }));
  }, []);

  const onChangeCameraType = useCallback(() => {
    setCameraType(prev => prev === 'front' ? 'back' : 'front');
  }, [cameraType]);

  const onChangeFlashMode = useCallback(() => {
    setFlashMode(prev => prev === 'off' ? 'on' : 'off');
  }, [flashMode]);

  useEffect(() => {
    if (show.loadingPreview && photo !== null) {
      setShow(prev => ({ ...prev, loadingPreview: false}));
    }
  }, [show.loadingPreview]);

  useEffect(() => {
    lockAsync(OrientationLock.ALL);
    return () => { lockAsync(OrientationLock.PORTRAIT_UP); };
  }, []);

  useEffect(() => {
    const eventListener = addOrientationChangeListener((orientationChangeEvent) => {
      setOrientation(orientationChangeEvent.orientationInfo.orientation);
    });
    return () => { eventListener.remove(); };
  }, []);

  useEffect(() => {
    (async () => {
      const currentOrientation = await getOrientationAsync();
      setOrientation(currentOrientation);
    })();
  }, []);

  useCameraPreviewLayer({
    showSaveButton: true,
    onSavePicture: () => onConfirm(),
    onClosePreview: () => onCancel(),
  }, [photo?.uri ?? null, show.loadingPreview]);

  if (orientation === null) {
    return <></>;
  }

  return (
    <>
      <Pressable
        onPress={async () => await onPictureTake()}
        style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}
      >
        <CameraView
          ref={cameraRef}
          facing={cameraType}
          flash={flashMode}
          videoQuality="2160p"
          style={[
            {
              aspectRatio: orientation === Orientation.PORTRAIT_UP ? (9 / 16) : (16 / 9),
              width:       orientation === Orientation.PORTRAIT_UP ? 'auto' : '100%',
              height:      orientation === Orientation.PORTRAIT_UP ? '100%' : 'auto',
            },
            cameraType ===  'front' && {
              transform: [{ scaleX: -1 }],
            },
          ]}
        />
      </Pressable>
      <CloseButton
        orientation={orientation}
        onPress={props.onBackPress}
      />
      <PicturesCounter
        cameraConfig={props.cameraConfig}
        orientation={orientation}
        picturesAmount={picturesAmount}
        flashMode={flashMode}
        onChangeFlashMode={() => onChangeFlashMode()}
        onChangeCameraType={() => onChangeCameraType()}
      />
    </>
    );
});

const PicturesCounter = memo((props: {
  cameraConfig: CameraPictureMode
  picturesAmount: number
  flashMode: FlashMode
  orientation: Orientation
  onChangeFlashMode: () => void
  onChangeCameraType: () => void
}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'center',
        bottom: 10 + bottom,
        gap: 10,
        opacity: 0.5,
        width: '100%',
      }}
    >
      <Text h3
        shadow
        shadowColor={'#fff'}
        style={{
          color: '#000',
        }}
      >
        {`${props.picturesAmount} / ${props.cameraConfig.picturesLimit ?? '...'}`}
      </Text>
      <CameraFooterButtons
        flashMode={props.flashMode}
        orientation={props.orientation}
        flashButtonPress={() => props.onChangeFlashMode()}
        changeCameraTypePress={() => props.onChangeCameraType()}
      />
    </View>
  );
})

const CloseButton = memo((props: {
  orientation: Orientation
  onPress: () => void
}) => {
  const { top, right } = useSafeAreaInsets()
  return (
    <View
      style={{
        position: 'absolute',
        top: top,
        right: right + 10,
        flexDirection: 'row',
        justifyContent: 'center',
        opacity: 0.5,
      }}
    >
      <Button.Icon
        iconName="close"
        onPress={props.onPress}
        theme={{
          font: '#000',
          font_active: '#666',
          background: '#666',
          background_active: '#222',
        }}
        iconSize={70}
        style={{
          backgroundColor: undefined,
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
        shadow
        shadowColor={'#fff'}
      />
    </View>
  );
});

const CameraFooterButtons = memo((props: {
  flashMode: FlashMode
  orientation: Orientation
  flashButtonPress: () => void
  changeCameraTypePress: () => void
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
      }}
    >
      <Button.Icon
        iconName={props.flashMode === 'on' ? 'flash' : 'flash-off'}
        onPress={() => props.flashButtonPress()}
        theme={{
          font: '#000',
          font_active: '#666',
          background: '#666',
          background_active: '#222',
        }}
        iconSize={50}
        style={{
          backgroundColor: undefined,
          height: 50,
          width: 50,
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
        shadow
        shadowColor={'#fff'}
      />
      <Button.Icon
        iconName="camera-reverse"
        onPress={() => props.changeCameraTypePress()}
        theme={{
          font: '#000',
          font_active: '#666',
          background: '#666',
          background_active: '#222',
        }}
        iconSize={50}
        style={{
          backgroundColor: undefined,
          height: 50,
          width: 50,
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
        shadow
        shadowColor={'#fff'}
      />
    </View>
  );
});
