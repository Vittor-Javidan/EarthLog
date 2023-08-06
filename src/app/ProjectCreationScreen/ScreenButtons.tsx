import React, { useMemo } from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import ConfigService from '@Services/ConfigService';
import { Widget } from '@Components/Widget';
import API_ProjectCreation from './LocalComponents/API_ProjectCreation';
import ProjectService from '@Services/ProjectService';
import { WidgetData } from '@Types/index';

export default function ScreenButtons() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

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
    API_ProjectCreation.refresh_ProjectWidgets();
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
