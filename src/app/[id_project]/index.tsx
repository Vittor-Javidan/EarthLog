import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { Drawer } from './Drawer';
import NavigationTree from './NavigationTree';

import SampleButtons from './LocalComponents/SampleButtons';

import ProjectService from '@Services/ProjectService';
import ScreenButtons from './ScreenButtons';

export default function ProjectScreen() {

  const id_project = useLocalSearchParams().id_project as string;
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  useBackPress(async () => await useNavigate('HOME SCREEN'));

  return (
    <Layout.Root
      title={projectSettings.name}
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Layout.View
        style={{
          paddingTop: 20,
          padding: 5,
          gap: 10,
        }}
      >
        <SampleButtons />
      </Layout.View>
    </Layout.Root>
  );
}
