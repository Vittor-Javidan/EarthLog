import React, { memo } from 'react';
import { Layout } from '@V1/Layout/index';

export const NavigationTree = memo((props: {
  onHomePress: () => void
  onSettingsPress: () => void
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
          iconName="settings-outline"
          onPress={() => props.onSettingsPress()}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="color-palette"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
