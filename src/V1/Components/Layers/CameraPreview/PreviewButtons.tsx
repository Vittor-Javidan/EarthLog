import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { addOrientationChangeListener, Orientation, getOrientationAsync } from 'expo-screen-orientation';

import { Button } from '@V1/Button/index';

export const PreviewButtons = memo((props: {
  onCancel: () => void
  onConfirm: () => void
}) => {

  const [orientation, setOrientation] = useState<Orientation | null>(null);
  const BOTTOM = orientation === Orientation.PORTRAIT_UP ? 60 : 20;

  useEffect(() => {
    (async () => {
      const currentOrientation = await getOrientationAsync();
      setOrientation(currentOrientation);
    })();
  }, []);

  useEffect(() => {
    const eventListener = addOrientationChangeListener((orientationChangeEvent) => {
      setOrientation(orientationChangeEvent.orientationInfo.orientation);
    });
    return () => { eventListener.remove(); };
  }, []);

  if (orientation === null) {
    return <></>;
  }

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
