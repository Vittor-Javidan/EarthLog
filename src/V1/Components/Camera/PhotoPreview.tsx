import React, { memo, useMemo } from 'react';
import { View, Image, LayoutRectangle, ActivityIndicator } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';

import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';

export const PhotoPreview = memo((props: {
  photo: CameraCapturedPicture | null
  dimensions: LayoutRectangle
  onCancel: () => void
  onConfirm: () => void
}) => {
  return props.photo !== null ? (
    <View
      style={{
        position: 'absolute',
        width: props.dimensions.width,
        height: props.dimensions.height,
      }}
    >
      <Image
        source={{ uri: props.photo.uri }}
        style={{
          flex: 1,
          aspectRatio: 9 / 16,
        }}
      />
      <PreviwButtons
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

const PreviwButtons = memo((props: {
  onCancel: () => void
  onConfirm: () => void
}) => {
  return (
    <View
    style={{
      position: 'absolute',
      bottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 10,
      gap: 10,
    }}
  >
    <Button.RoundedIcon
      iconName="close"
      onPress={() => props.onCancel()}
      theme={{
        font: '#F55',
        font_Pressed: '#666',
        background: '#666',
        background_Pressed: '#F55',
      }}
      buttonDiameter={70}
      showPlusSign={false}
    />
    <Button.RoundedIcon
      iconName="save"
      onPress={() => props.onConfirm()}
      theme={{
        font: '#5F5',
        font_Pressed: '#666',
        background: '#666',
        background_Pressed: '#5F5',
      }}
      buttonDiameter={70}
      showPlusSign={false}
    />
  </View>
  );
});

const LoadingFeedback = memo((props: {
  dimensions: LayoutRectangle
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
