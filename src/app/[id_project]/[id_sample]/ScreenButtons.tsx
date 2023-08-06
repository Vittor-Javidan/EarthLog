import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';

import { WidgetData } from '@Types/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import API_Widgets_Sample from './LocalComponents/API_Widgets_Sample';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  async function onCreateWidget(widgetData: WidgetData) {
    await ProjectService.createWidget_Sample(
      id_project,
      id_sample,
      widgetData,
      () => API_Widgets_Sample.refresh(),
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
          onCreateWidget={async (widgetData) => await onCreateWidget(widgetData)}
        />
      }
    />
  );
}
