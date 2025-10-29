import React, { memo } from 'react';
import { Dimensions } from 'react-native';

import { ThemeNames_Widgets } from '@V1/Types/AppTypes';

import { Layout } from '@V1/Layout/index';
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
          paddingBottom: Dimensions.get('window').height - 240,
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

