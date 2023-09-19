import React from 'react';

import { Text } from '@Components/Text';
import { WidgetThemeData } from '@Types/ProjectTypes';

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
