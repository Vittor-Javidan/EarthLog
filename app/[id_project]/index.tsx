import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Icon } from '@Components/Icon';
import { Layout } from '@Components/Layout';
import SampleButtons from './SampleButtons';
import { useBackPress, useNavigate } from 'app/GlobalHooks';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function ProjectScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const theme = useMemo(() => ConfigService.config.theme, []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  useBackPress(() => exitScreen());

  function exitScreen() {
    useNavigate('HOME SCREEN');
  }

  function goToSampleCreationScreenCreation() {
    useNavigate('SAMPLE CREATION SCREEN', id_project);
  }

  return (
    <Layout.Root
      title={projectSettings.name}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => exitScreen()}
        />,
      ]}
    >
      <Layout.ScrollView>
        <SampleButtons />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="New Sample"
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={() => goToSampleCreationScreenCreation()}
        />
      </Layout.View>
    </Layout.Root>
  );
}
