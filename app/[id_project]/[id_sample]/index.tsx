import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import Widgets_Sample from './Widgets_Sample';
import { useBackPress, useNavigate } from 'app/GlobalHooks';

import { SampleSettings } from '@Types/index';

import ProjectService from '@Services/ProjectService';
import { Drawer } from './Drawer';

export default function SampleScreens() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const settings = useMemo<SampleSettings>(() => ProjectService.getSampleFromCache(id_sample), []);

  useBackPress(() => useNavigate('PROJECT SCREEN', id_project));

  return (
    <Layout.Root
      title={settings.name}
      iconName="clipboard"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => useNavigate('HOME SCREEN')}
        />,
        <Icon.Project
          key="treeIcon_2"
          onPress={() => useNavigate('PROJECT SCREEN', id_project)}
        />,
      ]}
    >
      <Layout.ScrollView>
        <Widgets_Sample />
      </Layout.ScrollView>
    </Layout.Root>
  );
}
