import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';
import { navigate } from '@Globals/NavigationControler';
import { WidgetData } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_Widgets_Sample from './LocalComponents/API_Widgets_Sample';
import CacheService from '@Services/CacheService';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { theme } = useMemo(() => ConfigService.config, []);
  const { rules: rules_project } = useMemo(() => CacheService.getProjectFromCache(id_project), []);
  const { rules: rules_sample } = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  async function onCreateWidget(widgetData: WidgetData) {
    await ProjectService.createWidget_Sample(
      id_project,
      id_sample,
      widgetData,
      async () => {
        await CacheService.loadAllWidgets_Sample(id_project, id_sample);
        API_Widgets_Sample.refresh();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  const allowWidgetCreation = (
    rules_project.allowWidgetCreation_Sample === true ||
    rules_sample.allowWidgetCreation === true
  );

  return (
    <Layout.ScreenButtons
      button_left={
        <Layout.Button.IconRounded
          iconName="arrow-back"
          showPlusSign={false}
          color_background={theme.secondary}
          color={theme.onSecondary}
          onPress={() => navigate('PROJECT SCREEN', id_project)}
        />
      }
      button_right={allowWidgetCreation ? (
        <Widget.AddWidgetButton
          onCreateWidget={async (widgetData) => await onCreateWidget(widgetData)}
        />
      ) : undefined}
    />
  );
}
