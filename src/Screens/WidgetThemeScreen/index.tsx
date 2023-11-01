import React, { memo } from 'react';
import { ThemeNames_Widgets } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { LC } from './__LC__';

export const WidgetThemeScreen = memo((props: {
  onWidgetThemeSelect: (themeName: ThemeNames_Widgets) => void
}) => {

  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingLeft: 1,
          gap: 1,
        }}
      >
        <LC.ThemeButtons
          onWidgetThemeSelect={(themeName) => props.onWidgetThemeSelect(themeName)}
        />
      </Layout.ScrollView>
    </Layout.Screen>
  );
});

