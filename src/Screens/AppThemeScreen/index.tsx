import React, { memo } from 'react';

import { Loading } from '@Types/AppTypes';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const AppThemeScreen = memo((props: {
  themeScopeState: Loading
  onAppThemeChange: () => void
}) => {

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.themeScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation.SlideFromLeft
          delay={300}
          duration={200}
        >
          <Layout.ScrollView
            contentContainerStyle={{
              paddingTop: 55,
              paddingRight: 1,
              gap: 1,
            }}
          >
            <LC.ThemeButtons
              onAppThemeChange={() => props.onAppThemeChange()}
            />
          </Layout.ScrollView>
        </Animation.SlideFromLeft>
      )}
    </Layout.Screen>
  );
});
