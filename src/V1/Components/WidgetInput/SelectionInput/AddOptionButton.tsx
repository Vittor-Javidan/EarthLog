import React, { memo } from 'react';

import { WidgetTheme } from '@V1/Types/ProjectTypes';

import { Button } from '@V1/Button/index';

export const AddSelectionOptionButton = memo((props: {
  showAddOptionButton: boolean | undefined
  theme: WidgetTheme
  onAddOption: () => void
}) => {
  return props.showAddOptionButton ? (
    <Button.Icon
      iconName="add"
      onPress={() => props.onAddOption()}
      theme={{
        font: props.theme.background,
        font_Pressed: props.theme.font,
        background: props.theme.font,
        background_Pressed: props.theme.background,
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
