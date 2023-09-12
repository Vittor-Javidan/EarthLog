import React, { useMemo } from 'react';

import { WidgetData } from '@Types/index';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import { Widget } from '@Components/Widget';
import { Layout } from '@Components/Layout';
import { API } from '../__API__';

export default function ScreenButtons() {

  const { theme } = useMemo(() => ConfigService.config, []);

  function exitScreen() {
    API.TemporaryProject.reset();
    navigate('HOME SCREEN');
  }

  async function onConfirm() {

    const newProject = API.TemporaryProject.project;
    const { projectSettings: newProjectSettings } = newProject;

    if (newProjectSettings.id_project === '') {
      alert('ID cannot be empty. This is your project folder name.');
      return;
    }

    await ProjectService.createProject(
      newProject,
      () => exitScreen(),
      (errorMessage) => alert(errorMessage),
    );
  }

  function onCreateWidget(widgetData: WidgetData) {
    API.ProjectWidgets.addProjectWidget(widgetData);
    API.ProjectWidgets.refresh_ProjectWidgets();
  }

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="close"
          showPlusSign={false}
          color_background={theme.wrong}
          color={theme.onWrong}
          onPress={() => exitScreen()}
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
