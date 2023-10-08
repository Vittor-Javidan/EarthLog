import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { Loading, ThemeNames_Widgets } from '@Types/AppTypes';

import { Layout } from '@Layout/index';
import { LC } from './__LC__';

export const WidgetThemeScreen = memo((props: {
  themeScopeState: Loading
  onWidgetThemeSelect: (themeName: ThemeNames_Widgets) => void
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
          <LC.ThemeButtons
            onWidgetThemeSelect={(themeName) => props.onWidgetThemeSelect(themeName)}
          />
        </ScrollView>
      )}
    </Layout.Screen>
  );
});

