import React, { memo } from 'react';
import { Loading, ThemeNames_Widgets } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { LC } from './__LC__';

export const WidgetThemePreviewScreen = memo((props: {
  widgetThemeName: ThemeNames_Widgets
  themeScopeState: Loading
}) => {

  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      {props.themeScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView
          contentContainerStyle={{
            paddingHorizontal: 5,
            paddingTop: 55,
            gap: 1,
          }}
        >
          <LC.WidgetPreview
            themeName={props.widgetThemeName}
          />
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
});

