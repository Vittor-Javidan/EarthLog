import React, { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import Widgets_Sample from './Widgets_Sample';

import AppRoutes from '@Globals/AppRoutes';
import { SampleSettings } from '@Types/index';

import LogService from '@Services/LogService';
import ProjectService from '@Services/ProjectService';

export default function SampleScreens() {

  const { id_project, id_sample } = useLocalSearchParams();
  const navController = useRouter();
  const settings = useMemo<SampleSettings>(() => ProjectService.getSample(id_sample as string), []);

  LogService.useLog(`RENDERED: Sample Screen
    id project: ${id_project}
    id sample: ${id_sample}
  `);

  return (
    <Layout.Root
      title={settings.name}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => navController.push(AppRoutes.HOME)}
        />,
      ]}
    >
      <Layout.ScrollView>
        <Widgets_Sample />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="Back"
          onPress={() => {
            navController.push(AppRoutes.PROJECT_SCREEN( id_project as string ));
          }}
        />
      </Layout.View>
    </Layout.Root>
  );
}
