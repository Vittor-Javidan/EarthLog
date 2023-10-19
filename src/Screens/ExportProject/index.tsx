
import React, { memo } from 'react';

import { Loading } from '@Types/AppTypes';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const ExportProjectScreen = memo((props: {
  projectScopeState: Loading
}) => {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      {props.projectScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Animation.SlideFromLeft
          delay={200}
          duration={200}
        >
          <Layout.ScrollView>
            <LC.AvailableExportFormatButtons />
          </Layout.ScrollView>
        </Animation.SlideFromLeft>
      )}
    </Layout.Screen>
  );
});
