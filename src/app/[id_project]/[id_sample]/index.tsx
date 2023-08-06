import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { Drawer } from './Drawer';
import NavigationTree from './NavigationTree';
import Widgets_Sample from './LocalComponents/Widgets_Sample';

import ProjectService from '@Services/ProjectService';
import ScreenButtons from './ScreenButtons';

export default function SampleScreens() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);

  useBackPress(async () => await useNavigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={sampleSettings.name}
      drawerChildren={<Drawer />}
      navigationTree={<NavigationTree />}
      screenButtons={<ScreenButtons />}
    >
      <Widgets_Sample />
    </Layout.Root>
  );
}
