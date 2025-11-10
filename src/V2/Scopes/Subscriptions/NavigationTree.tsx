import React, { memo } from 'react';

import { Layout } from '@V2/Layout/index';

export const NavigationTree = memo((props : {
  onHomePress: () => void
}) => {
  return (
    <Layout.NavigationTree.Root
      iconButtons={[
        <Layout.NavigationTree.Button
          key="treeIcon_1"
          iconName="home-outline"
          onPress={() => props.onHomePress()}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_2"
          iconName="logo-google-playstore"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
