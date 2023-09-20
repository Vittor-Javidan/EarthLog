import React from 'react';

import { WidgetThemeData } from '@Types/ProjectTypes';

import { Text } from '@Text/index';

export function ThemeDisplay(props: {
  theme: WidgetThemeData
}) {

  const { theme } = props;

  //TODO: Build a Widget Theme Change System here
  return (
    <Text.P
      style={{
        paddingHorizontal: 10,
        color: theme.font,
      }}
    >
      Soon...
    </Text.P>
  );
}
