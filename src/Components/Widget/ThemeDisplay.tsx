import React, { memo } from 'react';

import { WidgetThemeDTO } from '@Types/ProjectTypes';

import { Text } from '@Text/index';

export const ThemeDisplay = memo((props: {
  theme: WidgetThemeDTO
}) => {
  return (
    <Text p
      style={{
        paddingHorizontal: 10,
        color: props.theme.font,
      }}
    >
      Soon...
    </Text>
  );
});
