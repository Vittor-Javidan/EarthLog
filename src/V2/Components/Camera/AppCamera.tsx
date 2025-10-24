import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, Pressable, Dimensions, ScaledSize } from 'react-native';
import { CameraView, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import * as ScreenOrientation from 'expo-screen-orientation';

import { CameraPictureMode } from '@V2/Types/AppTypes';
import CameraService from '@V2/Services/CameraService';
import MediaService from '@V2/Services/MediaService';
import IDService from '@V2/Services/IDService';

import { Button } from '@V2/Button/index';
import { Text } from '@V2/Text/index';
import { PhotoPreview } from './PhotoPreview';

export const AppCamera = memo((props: {
  cameraConfig: CameraPictureMode
  onBackPress: () => void
}) => {
  const cameraRef = useRef<CameraView>(null);
  const [screenDimensions , setScreenDimensions ] = useState<ScaledSize>(Dimensions.get('screen'));
  const [cameraType       , setCameraType       ] = useState<CameraType>('back');
  const [orientation      , setOrientation      ] = useState<ScreenOrientation.Orientation>(ScreenOrientation.Orientation.PORTRAIT_UP);
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
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    return () => { ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP); };
  }, []);

  useEffect(() => {
    const eventListener = ScreenOrientation.addOrientationChangeListener((orientationChangeEvent) => {
      setOrientation(orientationChangeEvent.orientationInfo.orientation);
      setScreenDimensions(Dimensions.get('screen'));
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
    >
      <Pressable
        onPress={async () => await onPictureTake()}
        style={{ flex: 1 }}
      >
        <CameraView
          ref={cameraRef}
          facing={cameraType}
          flash={flashMode}
          videoQuality="2160p"
          style={[
            {
              width: screenDimensions.width,
              height: screenDimensions.height,
            },
            cameraType ===  'front' && {
              transform: [{ scaleX: -1 }],
            },
          ]}
        />
      </Pressable>
      {(show.loadingPreview && photo !== undefined) ? (
        <PhotoPreview
          photo={photo}
          dimensions={screenDimensions}
          orientation={orientation}
          onCancel={() => onCancel()}
          onConfirm={() =>  onConfirm()}
        />
      ) : (<>
        <CloseButton
          orientation={orientation}
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
            shadow
            shadowColor={'#fff'}
            style={{
              color: '#000',
            }}
          >
            {`${picturesAmount} / ${props.cameraConfig.picturesLimit ?? '...'}`}
          </Text>
          <CameraFooterButtons
            flashMode={flashMode}
            orientation={orientation}
            flashButtonPress={onChangeFlashMode}
            changeCameraTypePress={onChangeCameraType}
          />
        </View>
      </>)}
    </View>
  );
});

const CloseButton = memo((props: {
  orientation: ScreenOrientation.Orientation
  onPress: () => void
}) => {

  const TOP = props.orientation === ScreenOrientation.Orientation.PORTRAIT_UP ? 30 : 15;
  const LEFT = props.orientation === ScreenOrientation.Orientation.PORTRAIT_UP ? 20 : 50;

  return (
    <View
      style={{
        position: 'absolute',
        top: TOP,
        right: LEFT,
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
  orientation: ScreenOrientation.Orientation
  flashButtonPress: () => void
  changeCameraTypePress: () => void
}) => {
  const BOTTOM = props.orientation === ScreenOrientation.Orientation.PORTRAIT_UP ? 40 : 0;
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        paddingBottom: BOTTOM,
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
