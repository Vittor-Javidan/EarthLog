import React from 'react';

import { Layout } from '@Layout/index';

export function Screen4() {
  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      <Layout.ScrollView
        contenContainerStyle={{
          paddingTop: 55,
          paddingHorizontal: 5,
          gap: 10,
        }}
      >
        <></>
      </Layout.ScrollView>
    </Layout.Screen>
  );
}
