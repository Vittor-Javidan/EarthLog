import React, { memo } from 'react';
import { ScrollView } from 'react-native';
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
        <ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            paddingBottom: 150,
            paddingHorizontal: 1,
            gap: 1,
          }}
        >
          <LC.WidgetPreview
            themeName={props.widgetThemeName}
          />
        </ScrollView>
      )}
    </Layout.Screen>
  );
});

