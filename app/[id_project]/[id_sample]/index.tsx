import React, { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import Widgets_Sample from './Widgets_Sample';

import AppRoutes from '@Globals/AppRoutes';
import { SampleSettings } from '@Types/index';

import ProjectService from '@Services/ProjectService';
import useBackPress from 'app/GlobalHooks';

export default function SampleScreens() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const navController = useRouter();
  const settings = useMemo<SampleSettings>(() => ProjectService.getSampleFromCache(id_sample), []);

  useBackPress(() => exitScreen());

  function exitScreen() {
    navController.push(AppRoutes.PROJECT_SCREEN(id_project));
  }

  function goToHomeScreen() {
    navController.push(AppRoutes.HOME);
  }

  return (
    <Layout.Root
      title={settings.name}
      iconName="clipboard"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => goToHomeScreen()}
        />,
        <Icon.Project
          key="treeIcon_2"
          onPress={() => exitScreen()}
        />,
      ]}
    >
      <Layout.ScrollView>
        <Widgets_Sample />
      </Layout.ScrollView>
    </Layout.Root>
  );
}
