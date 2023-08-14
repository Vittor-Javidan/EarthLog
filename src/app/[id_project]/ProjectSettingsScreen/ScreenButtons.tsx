import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';
import API_Widgets_Project from './LocalComponents/API_Widgets_Project';
import { WidgetData } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme } = useMemo(() => ConfigService.config, []);
  const { rules } = useMemo(() => ProjectService.getProjectFromCache(id_project), []);
  const [show_DeleteSwap, setShow_DeleteSwap] = useState<boolean>(false);

  async function createWidget_Project(widgetData: WidgetData) {
    await ProjectService.createWidget_Project(
      id_project,
      widgetData,
      () => API_Widgets_Project.refresh(),
      (errorMessage) => alert(errorMessage)
    );
  }

  async function deleteProject() {
    await ProjectService.deleteProject(
      id_project,
      async () => await useNavigate('HOME SCREEN'),
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.ScreenButtons

      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />
      }

      button_middle={
        <Layout.Button.IconRounded
          iconName="trash-outline"
          showPlusSign={false}
          color_background={theme.wrong}
          color={theme.onWrong}
          onPress={() => setShow_DeleteSwap(true)}
        />
      }

      button_right={rules.allowWidgetCreation_Project ? (
        <Widget.AddWidgetButton
          onCreateWidget={async (widgetData) => await createWidget_Project(widgetData)}
        />
      ) : undefined}

      showSwipe={show_DeleteSwap}
      SwipeButton={
        <Layout.Button.DeleteSwipe
          onSwipe={async () => await deleteProject()}
          onCancel={() => setShow_DeleteSwap(false)}
        />
      }
    />
  );
}
