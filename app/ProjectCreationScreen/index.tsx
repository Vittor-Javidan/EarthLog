import React, { useMemo } from 'react';
import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import Inputs_ProjectSettings from './Inputs_ProjectSettings';
import Widgets_PointTemplate from './Widgets_PointTemplate';
import Widgets_Project from './Widgets_Project';
import { useBackPress, useNavigate } from 'app/GlobalHooks';
import Drawer from './Drawer';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_ProjectCreation from './API_ProjectCreation';

export default function ProjectCreationScreen() {

  const theme = useMemo(() => ConfigService.config.theme, []);
  const stringResources = useMemo(
    () => translations.Screens.ProjectCreationScreen[ConfigService.config.language], []
  );

  useBackPress(() => exitScreen());

  function exitScreen() {
    API_ProjectCreation.reset();
    useNavigate('HOME SCREEN');
  }

  async function onConfirm() {

    if (API_ProjectCreation.temporaryProject.projectSettings.id_project === '') {
      alert('ID cannot be empty. This is your project folder name.');
      return;
    }

    if (API_ProjectCreation.temporaryProject.projectSettings.name === '') {
      alert('Project Name Empty.');
      return;
    }

    await ProjectService.createProject(
      API_ProjectCreation.temporaryProject,
      () => exitScreen(),
      (errorMessage) => alert(errorMessage),
    );
  }

  return (
    <Layout.Root
      title={stringResources['Project creation']}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Icon.Home
          key="treeIcon_1"
          onPress={() => useNavigate('HOME SCREEN')}
        />,
      ]}
    >
      <Layout.ScrollView>
        <Inputs_ProjectSettings />
        <Widgets_Project />
        <Widgets_PointTemplate />
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title={stringResources['Cancel']}
          overrideBackgroundColor={theme.wrong}
          overrideTextColor={theme.onWrong}
          onPress={() => exitScreen() }
        />
        <Layout.Button
          title={stringResources['Create']}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
          onPress={async () => await onConfirm()}
        />
      </Layout.View>
    </Layout.Root>
  );
}

