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
  const id_sample = useLocalSearchParams().id_sample as string;

  const { theme } = useMemo(() => ConfigService.config, []);
  const { rules: rules_sample } = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  async function onCreateWidget(widgetData: WidgetData) {
    await ProjectService.createWidget_Sample(
      id_project,
      id_sample,
      widgetData,
      async () => {
        await CacheService.loadAllWidgets_Sample(id_project, id_sample);
        API.SampleWidgets.refresh();
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
          onPress={() => navigate('PROJECT SCOPE', id_project)}
        />
      }
      button_right={rules_sample.allowWidgetCreation === true ? (
        <Widget.AddWidgetButton
          onCreateWidget={async (widgetData) => await onCreateWidget(widgetData)}
        />
      ) : undefined}
    />
  );
}
