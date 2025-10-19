import React from 'react';

import { Layout } from '@V1/Layout/index';

export default function Screen1() {
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
