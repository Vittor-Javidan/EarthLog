import React, { useMemo } from 'react';

import { Layout } from '@Layout/index';
import ConfigService from '@Services/ConfigService';

export function Screen1() {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (
    <Layout.Screen
      screenButtons={<></>}
      style={{
        backgroundColor: theme.background,
      }}
    >
      <Layout.ScrollView
        contenContainerStyle={{
          paddingTop: 55,
        }}
      >
        <></>
      </Layout.ScrollView>
    </Layout.Screen>
  );
}
