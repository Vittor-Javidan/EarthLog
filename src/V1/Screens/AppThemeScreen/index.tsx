import React, { memo } from 'react';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const AppThemeScreen = memo((props: {
  onAppThemeChange: () => void
}) => {

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <Animation.SlideFromLeft
        delay={200}
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
    </Layout.Screen>
  );
});
