import React, { useMemo } from 'react';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Layout } from '@Layout/index';

export function Screen1() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);

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
