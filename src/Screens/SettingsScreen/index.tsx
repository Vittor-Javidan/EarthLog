
import React, { memo } from 'react';

import { Loading } from '@Types/AppTypes';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const SettingsScreen = memo((props: {
  settingsScopeState: Loading
}) => {

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.settingsScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation.SlideFromLeft
          delay={200}
          duration={200}
        >
          <Layout.ScrollView>
            <LC.SettingsButtons />
          </Layout.ScrollView>
        </Animation.SlideFromLeft>
      )}
    </Layout.Screen>
  );
});
