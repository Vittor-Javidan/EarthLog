import React from 'react';

import { WidgetThemeDTO } from '@Types/ProjectTypes';

import { Text } from '@Text/index';

export function ThemeDisplay(props: {
  theme: WidgetThemeDTO
}) {
  return (
    <Text.P
      style={{
        paddingHorizontal: 10,
        color: props.theme.font,
      }}
    >
      Soon...
    </Text.P>
  );
}
