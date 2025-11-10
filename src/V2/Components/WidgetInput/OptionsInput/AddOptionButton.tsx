import React, { memo } from 'react';

import { WidgetTheme } from '@V2/Types/ProjectTypes';

import { Button } from '@V2/Button/index';

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
