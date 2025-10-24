import React, { memo, useMemo } from 'react';
import { View, Image, ActivityIndicator, ScaledSize } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import * as ScreenOrientation from 'expo-screen-orientation';

import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';

export const PhotoPreview = memo((props: {
  orientation: ScreenOrientation.Orientation
  photo: CameraCapturedPicture | null
  dimensions: ScaledSize
  onCancel: () => void
  onConfirm: () => void
}) => {
  return props.photo !== null ? (
    <View
      style={{
        position: 'absolute',
        width: props.dimensions.width,
        height: props.dimensions.height,
        backgroundColor: 'green',
      }}
    >
      <Image
        source={{ uri: props.photo.uri }}
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      />
      <PreviewButtons
        onConfirm={() => props.onConfirm()}
        onCancel={() => props.onCancel()}
      />
    </View>
  ) : (
    <LoadingFeedback
      dimensions={props.dimensions}
    />
  );
});

const PreviewButtons = memo((props: {
  onCancel: () => void
  onConfirm: () => void
}) => {
  const BOTTOM = 40;
  return (
    <View
      style={{
        position: 'absolute',
        bottom: BOTTOM,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
        gap: 40,
        backgroundColor: 'blue',
      }}
    >
    <Button.RoundedIcon
      iconName="close"
      onPress={() => props.onCancel()}
      theme={{
        font: '#F55',
        font_active: '#666',
        background: '#666',
        background_active: '#F55',
      }}
      buttonDiameter={70}
      showPlusSign={false}
    />
    <Button.RoundedIcon
      iconName="save"
      onPress={() => props.onConfirm()}
      theme={{
        font: '#5F5',
        font_active: '#666',
        background: '#666',
        background_active: '#5F5',
      }}
      buttonDiameter={70}
      showPlusSign={false}
    />
  </View>
  );
});

const LoadingFeedback = memo((props: {
  dimensions: ScaledSize
}) => {

  const config    = useMemo(() => ConfigService.config, []);
  const theme     = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  return (
    <View
      style={{
        position: 'absolute',
        width: props.dimensions.width,
        height: props.dimensions.height,
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
