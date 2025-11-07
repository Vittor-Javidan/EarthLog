import React, { memo } from 'react'
import { Layout } from '@V1/Layout/index';

export const NavigationTree = memo((props: {
  onHomePress: () => void
  onFolderPress: () => void
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
          iconName="folder-outline"
          onPress={() => props.onFolderPress()}
        />,
        <Layout.NavigationTree.Button
          key="treeIcon_3"
          iconName="clipboard"
          onPress={() => {}}
        />,
      ]}
    />
  );
});
