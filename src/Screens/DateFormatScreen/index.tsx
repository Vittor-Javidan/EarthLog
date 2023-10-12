import React, { memo } from 'react';

import { Loading } from '@Types/AppTypes';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const DateFormatScreen = memo((props: {
  timeAndDateScopeState: Loading
}) => {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.timeAndDateScopeState === 'Loading' ? (
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
            <LC.DateFormatButtons />
          </Layout.ScrollView>
        </Animation.SlideFromLeft>
      )}
    </Layout.Screen>
  );
});
