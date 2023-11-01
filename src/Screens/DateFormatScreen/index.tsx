import React, { memo } from 'react';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const DateFormatScreen = memo(() => {
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
          <LC.DateFormatButtons />
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
