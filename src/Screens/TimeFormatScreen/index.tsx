import React, { memo } from 'react';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const TimeFormatScreen = memo(() => {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingLeft: 1,
          gap: 1,
        }}
      >
        <LC.TimeFormatButtons />
      </Layout.ScrollView>
    </Layout.Screen>
  );
});
