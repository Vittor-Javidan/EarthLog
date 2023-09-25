import React from 'react';

import { Layout } from '@Layout/index';

export function Screen1() {
  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
        }}
      >
        <></>
      </Layout.ScrollView>
    </Layout.Screen>
  );
}
