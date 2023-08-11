import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';
import API_Widgets_Project from './LocalComponents/API_Widgets_Project';
import { WidgetData } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import DeleteButton from './LocalComponents/DeleteButton';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const { rules } = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  async function onCreate(widgetData: WidgetData) {
    await ProjectService.createWidget_Project(
      id_project,
      widgetData,
      () => API_Widgets_Project.refresh(),
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
        <DeleteButton />
      }
      button_right={rules.allowWidgetCreation_Project ? (
        <Widget.AddWidgetButton
          onCreateWidget={async (widgetData) => await onCreate(widgetData)}
        />
      ) : undefined}
    />
  );
}
