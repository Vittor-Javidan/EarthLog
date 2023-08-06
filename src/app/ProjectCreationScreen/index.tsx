import React, { useState, useMemo } from 'react';
import { useBackPress, useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import Drawer from './Drawer';
import Inputs_ProjectSettings from './Inputs_ProjectSettings';
import Widgets_Project from './Widgets_Project';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_ProjectCreation from './API_ProjectCreation';
import { Widget } from '@Components/Widget';
import { WidgetData } from '@Types/index';

export default function ProjectCreationScreen() {

  const { config } = useMemo(() => ConfigService, []);
  const { language, theme } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  const [_, refresh] = useState<boolean>(false);

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

  function onCreateWidget(widgetData: WidgetData) {
    API_ProjectCreation.addProjectWidget(widgetData);
    refresh(prev => !prev);
  }

  return (
    <Layout.Root
      title={stringResources['Project creation']}
      iconName="map"
      showNavigationTree={true}
      drawerChildren={<Drawer />}
      navigationTreeIcons={[
        <Layout.Button.Icon
          key="treeIcon_1"
          iconName="map"
          onPress={async () => await exitScreen()}
        />,
      ]}
      button_left={
        <Layout.Button.IconRounded
          iconName="close"
          showPlusSign={false}
          color_background={theme.wrong}
          color={theme.onWrong}
          onPress={async () => await exitScreen()}
        />
      }
      button_middle={
        <Widget.AddWidgetButton
          onCreateWidget={(widgetData) => onCreateWidget(widgetData)}
        />
      }
      button_right={
        <Layout.Button.IconRounded
          iconName="save"
          showPlusSign={false}
          color_background={theme.confirm}
          color={theme.onConfirm}
          onPress={async () => await onConfirm()}
        />
      }
    >
      <Inputs_ProjectSettings />
      <Widgets_Project />
    </Layout.Root>
  );
}
