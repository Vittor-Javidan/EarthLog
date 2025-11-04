import React, { memo } from 'react';

import { Layout } from '@V2/Layout/index';

export const Screen2 = memo(() => {
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
