import React, { memo } from 'react';

import { Layout } from '@V2/Layout/index';

export const Screen4 = memo(() => {
  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingHorizontal: 5,
          gap: 10,
        }}
      >
        <></>
      </Layout.ScrollView>
    </Layout.Screen>
  );
});
