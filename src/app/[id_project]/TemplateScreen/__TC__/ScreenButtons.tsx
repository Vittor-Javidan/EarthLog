import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { WidgetData } from '@Types/index';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Layout } from '@Components/Layout';
import { Widget } from '@Components/Widget';
import { API } from '../__API__';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme } = useMemo(() => ConfigService.config, []);
  const { rules } = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  async function onCreate(widgetData: WidgetData) {
    await ProjectService.createWidget_Template(
      id_project,
      widgetData,
      async () => {
        await CacheService.loadAllWidgets_Template(id_project);
        API.TemplateWidgets.refresh();
      },
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
          onPress={() => navigate('PROJECT SCREEN', id_project)}
        />
      }
      button_right={rules.allowWidgetCreation_Template ? (
        <Widget.AddWidgetButton
          onCreateWidget={async (widgetData) => await onCreate(widgetData)}
        />
      ) : undefined}
    />
  );
}
