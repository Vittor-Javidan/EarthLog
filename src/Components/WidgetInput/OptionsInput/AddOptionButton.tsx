import React, { memo } from 'react';

import { Button } from '@Button/index';
import { WidgetTheme } from '@Types/ProjectTypes';

export const AddOptionButton = memo((props: {
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
