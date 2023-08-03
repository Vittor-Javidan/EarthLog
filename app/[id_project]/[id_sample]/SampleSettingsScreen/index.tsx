import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';
import { Icon } from '@Components/Icon';
import { useNavigate } from 'app/GlobalHooks';
import Inputs_SampleSettings from './Inputs_SampleSettings';
import DeleteButton from './DeleteButton';

export default function SampleSettingsScreen() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  return (
    <Layout.Root
      title="Sample Settings"
      iconName="settings"
      showNavigationTree={true}
      drawerChildren={<></>}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={async () => await useNavigate('HOME SCREEN')}
        />,
        <Icon.Project
          key="treeIcon_2"
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />,
        <Icon.Sample
          key="treeIcon_3"
          onPress={async () => await useNavigate('SAMPLE SCREEN', id_project, id_sample)}
        />,
      ]}
    >
      <Layout.ScrollView>
        <Inputs_SampleSettings />
        <DeleteButton />
      </Layout.ScrollView>
    </Layout.Root>
  );
}
