import React, { memo, useMemo } from 'react';
import { View, Image, LayoutRectangle, ActivityIndicator } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

export const PhotoPreview = memo((props: {
  photo: CameraCapturedPicture | null
  dimensions: LayoutRectangle
}) => {

  const config    = useMemo(() => ConfigService.config, []);
  const theme     = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  return props.photo !== null ? (
    <Image
      source={{ uri: props.photo.uri }}
      style={{
        position: 'absolute',
        width: props.dimensions.width,
        height: props.dimensions.height,
        aspectRatio: 9 / 16,
      }}
    />
  ) : (
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

