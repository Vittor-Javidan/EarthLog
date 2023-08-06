import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';
import { WidgetData } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import API_Widgets_Template from './LocalComponents/API_Widgets_Template';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  async function onCreate(widgetData: WidgetData) {
    await ProjectService.createWidget_Template(
      id_project,
      widgetData,
      () => API_Widgets_Template.refresh(),
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.primary}
          color={theme.onPrimary}
          onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
        />
      }
      button_right={
        <Widget.AddWidgetButton
          onCreateWidget={async (widgetData) => await onCreate(widgetData)}
        />
      }
    />
  );
}
