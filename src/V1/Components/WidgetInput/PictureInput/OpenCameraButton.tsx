import React, { memo } from 'react';

import { WidgetTheme } from '@V1/Types/ProjectTypes';

import { Button } from '@V1/Button/index';

export const OpenCameraButton = memo((props: {
  showButton: boolean | undefined
  theme: WidgetTheme
  onPress: () => void
}) => {
  return props.showButton ? (
    <Button.Icon
      iconName="camera"
      onPress={props.onPress}
      theme={{
        font:              props.theme.background,
        font_active:       props.theme.font,
        background:        props.theme.font,
        background_active: props.theme.background,
      }}
      style={{
        alignSelf: 'center',
        marginTop: 5,
        height: 25,
        width: '50%',
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRadius: 6,
      }}
    />
  ) : <></>;
});
