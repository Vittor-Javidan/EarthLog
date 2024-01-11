import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, LayoutRectangle, Pressable } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import * as ScreenOrientation from 'expo-screen-orientation';

import { CameraPictureMode } from '@V1/Types/AppTypes';
import CameraService from '@V1/Services/CameraService';
import MediaService from '@V1/Services/MediaService';
import IDService from '@V1/Services/IDService';

import { Button } from '@V1/Button/index';
import { Text } from '@V1/Text/index';
import { PhotoPreview } from './PhotoPreview';

export const AppCamera = memo((props: {
  cameraConfig: CameraPictureMode
  onBackPress: () => void
}) => {

  const cameraRef = useRef<Camera>(null);
  const [previewDimensions, setPreviewDimensions] = useState<LayoutRectangle>({ height: 0, width: 0, x: 0, y: 0});
  const [cameraType       , setCameraType       ] = useState<CameraType>(CameraType.back);
  const [orientation      , setOrientation      ] = useState<ScreenOrientation.Orientation>(ScreenOrientation.Orientation.PORTRAIT_UP);
  const [flashMode        , setFlashMode        ] = useState<FlashMode>(FlashMode.off);
  const [photo            , setPhoto            ] = useState<CameraCapturedPicture | null>(null);
  const [picturesAmount   , setPicturesAmount   ] = useState<number>(props.cameraConfig.picturesAmount);
  const [hudColor         , setHudColor         ] = useState<'#DDD' | '#000'>('#000');
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
          CameraService.triggerOnPictureTake(id_picture);
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
    setCameraType(prev => prev === CameraType.front ? CameraType.back : CameraType.front);
  }, [cameraType]);

  const onChangeFlashMode = useCallback(() => {
    setFlashMode(prev => prev === FlashMode.off ? FlashMode.on : FlashMode.off);
  }, [flashMode]);

  const onChangeHudColor = useCallback(() => {
    setHudColor(prev => {
      return prev === '#000' ? '#DDD' : '#000';
    });
  }, []);

  useEffect(() => {
    if (show.loadingPreview && photo !== null) {
      setShow(prev => ({ ...prev, loadingPreview: false}));
    }
  }, [show.loadingPreview]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    return () => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP); };
  }, []);

  useEffect(() => {
    const eventListener = ScreenOrientation.addOrientationChangeListener((orientationChangeEvent) => {
      setOrientation(orientationChangeEvent.orientationInfo.orientation);
    });
    return () => { eventListener.remove(); };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onLayout={(e) => setPreviewDimensions(e.nativeEvent.layout)}
    >
      <Camera
        ref={cameraRef}
        type={cameraType}
        flashMode={flashMode}
        ratio="16:9"
        style={[
          {
            aspectRatio: orientation === ScreenOrientation.Orientation.PORTRAIT_UP ? (9 / 16) : (16 / 9),
            width: orientation === ScreenOrientation.Orientation.PORTRAIT_UP ? '100%' : undefined,
            height: orientation !== ScreenOrientation.Orientation.PORTRAIT_UP ? '100%' : undefined,
            overflow: 'hidden',
          },
          cameraType ===  CameraType.front && {
            transform: [{ scaleX: -1 }],
          },
        ]}
      >
        <Pressable
          onPress={async () => await onPictureTake()}
          style={{ flex: 1 }}
        />
      </Camera>
      {show.loadingPreview ? (
        <PhotoPreview
          photo={photo}
          dimensions={previewDimensions}
          orientation={orientation}
          onCancel={() => onCancel()}
          onConfirm={() =>  onConfirm()}
        />
      ) : (<>
        <CloseButton
          color={hudColor}
          onPress={props.onBackPress}
        />
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            bottom: 20,
            gap: 10,
            opacity: 0.5,
            width: '100%',
          }}
        >
          <Text h3
            style={{
              color: hudColor,
            }}
          >
            {`${picturesAmount} / ${props.cameraConfig.picturesLimit ?? '...'}`}
          </Text>
          <CameraFooterButtons
            color={hudColor}
            flashMode={flashMode}
            flashButtonPress={onChangeFlashMode}
            changeHudColorPress={onChangeHudColor}
            changeCameraTypePress={onChangeCameraType}
          />
        </View>
      </>)}
    </View>
  );
});

const CloseButton = memo((props: {
  color: string
  onPress: () => void
}) => {
  return (
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
        onPress={props.onPress}
        theme={{
          font: props.color,
          font_active: '#666',
          background: '#666',
          background_active: '#222',
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
  );
});

const CameraFooterButtons = memo((props: {
  color: string
  flashMode: FlashMode
  flashButtonPress: () => void
  changeHudColorPress: () => void
  changeCameraTypePress: () => void
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <Button.Icon
        iconName={props.flashMode === FlashMode.on ? 'flash-off' : 'flash'}
        onPress={() => props.flashButtonPress()}
        theme={{
          font: props.color,
          font_active: '#666',
          background: '#666',
          background_active: '#222',
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
        iconName="contrast"
        onPress={() => props.changeHudColorPress()}
        theme={{
          font: props.color,
          font_active: '#666',
          background: '#666',
          background_active: '#222',
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
        onPress={() => props.changeCameraTypePress()}
        theme={{
          font: props.color,
          font_active: '#666',
          background: '#666',
          background_active: '#222',
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
  );
});
