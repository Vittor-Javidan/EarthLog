import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useBackPress, useNavigate } from 'app/GlobalHooks';
import { Layout } from '@Components/Layout';
import { Icon } from '@Components/Icon';
import API_ProjectEdit from './API_ProjectEdit';

import ProjectService from '@Services/ProjectService';
import Inputs_ProjectSettings from './Inputs_ProjectSettings';
import DeleteButton from './DeleteButton';
import SaveButton from './SaveButton';
import Widgets_Project from './Widgets_Project';

export default function ProjectSettingsScreen() {

  const id_project = useLocalSearchParams().id_project as string;

  const [loaded, setLoaded] = useState<boolean>(false);

  useBackPress(async () => await discardAndExit());

  async function discardAndExit() {

    if (API_ProjectEdit.unsavedChanges === false) {
      useNavigate('PROJECT SCREEN', id_project);
      return;
    }

    Alert.alert(
      'Hold on!',
      'Want to discard changes?',
      [
        {
          text: 'NO',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: async () => await useNavigate('PROJECT SCREEN', id_project),
        },
      ]
    );
  }

  useEffect(() => {
    API_ProjectEdit.init(
      ProjectService.getLastProjectFromCache(),
    );
    setLoaded(true);
  }, []);

  return (
    <Layout.Root
      title="Project Settings"
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
      ]}
    >
      {loaded && (<>
        <Layout.ScrollView>
          <Inputs_ProjectSettings />
          <Widgets_Project />
          <DeleteButton />
        </Layout.ScrollView>
        <Layout.View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <SaveButton />
        </Layout.View>
      </>)}
    </Layout.Root>
  );
}
