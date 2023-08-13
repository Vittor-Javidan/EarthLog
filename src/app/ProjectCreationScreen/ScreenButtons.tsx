import React, { useMemo } from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';
import { Widget } from '@Components/Widget';
import ProjectService from '@Services/ProjectService';
import { WidgetData } from '@Types/index';
import API_TemporaryProject from './LocalComponents/API_TemporaryProject';
import API_Widgets_Project from './LocalComponents/API_Widgets_Project';

export default function ScreenButtons() {

  const { theme } = useMemo(() => ConfigService.config, []);

  async function exitScreen() {
    API_TemporaryProject.reset();
    await useNavigate('HOME SCREEN');
  }

  async function exitAndOpenProject(id_project: string) {
    API_TemporaryProject.reset();
    await useNavigate('PROJECT SCREEN (FROM PROJECT CREATION SCREEN)', id_project);
  }

  async function onConfirm() {

    const newProject = API_TemporaryProject.project;
    const { projectSettings: newProjectSettings } = newProject;

    if (newProjectSettings.id_project === '') {
      alert('ID cannot be empty. This is your project folder name.');
      return;
    }

    await ProjectService.createProject(
      newProject,
      async () => await exitAndOpenProject(newProjectSettings.id_project),
      (errorMessage) => alert(errorMessage),
    );
  }

  function onCreateWidget(widgetData: WidgetData) {
    API_Widgets_Project.addProjectWidget(widgetData);
    API_Widgets_Project.refresh_ProjectWidgets();
  }

  return (
    <Layout.ScreenButtons
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
    />
  );
}
