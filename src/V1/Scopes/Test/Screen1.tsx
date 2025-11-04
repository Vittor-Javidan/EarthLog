import React, { memo } from 'react';

import { Layout } from '@V1/Layout/index';

export const Screen1 = memo(() => {
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
});
