import React, { memo } from 'react';

import { ThemeNames_Widgets } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { LC } from './__LC__';

export const WidgetThemePreviewScreen = memo((props: {
  themeName: ThemeNames_Widgets
}) => {

  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 5,
          paddingTop: 55,
          gap: 1,
        }}
      >
        <LC.WidgetPreview
          themeName={props.themeName}
        />
      </Layout.ScrollView>
    </Layout.Screen>
  );
});

