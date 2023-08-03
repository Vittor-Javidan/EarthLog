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

  useBackPress(async () => await exitScreen());

  async function exitScreen() {
    API_ProjectCreation.reset();
    await useNavigate('HOME SCREEN');
  }

  async function exitAndOpenProject(id_project: string) {
    API_ProjectCreation.reset();
    await useNavigate('PROJECT SCREEN (FROM PROJECT CREATION SCREEN)', id_project);
  }

  async function onConfirm() {

    const { temporaryProject: newProject } = API_ProjectCreation;
    const { projectSettings: newProjectSettings } = newProject;

    if (newProjectSettings.id_project === '') {
      alert('ID cannot be empty. This is your project folder name.');
      return;
    }

    if (newProjectSettings.name === '') {
      alert('Project Name Empty.');
      return;
    }

    await ProjectService.createProject(
      newProject,
      async () => await exitAndOpenProject(newProjectSettings.id_project),
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
          onPress={async () => await useNavigate('HOME SCREEN')}
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
          onPress={async () => await exitScreen() }
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
