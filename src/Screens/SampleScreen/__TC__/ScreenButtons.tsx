import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import { API } from '../__API__';

export default function ScreenButtons() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { theme } = useMemo(() => ConfigService.config, []);

  async function onCreateWidget() {
    await ProjectService.createWidget_Sample(
      id_project,
      id_sample,
      ProjectService.getWidgetData(),
      async () => {
        await CacheService.loadAllWidgets_Sample(id_project, id_sample);
        API.SampleWidgets.refresh();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.ScreenButtons
      buttons={[
        <Button.RoundedIcon
          key="1"
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('PROJECT SCOPE', id_project)}
          theme={{
            font: theme.onSecondary,
            font_Pressed: theme.onTertiary,
            background: theme.secondary,
            background_Pressed: theme.tertiary,
          }}
        />,
        <Button.RoundedIcon
          key="2"
          iconName="list"
          showPlusSign={true}
          buttonDiameter={60}
          onPress={() => onCreateWidget()}
          theme={{
            font: theme.onConfirm,
            font_Pressed: theme.onTertiary,
            background: theme.confirm,
            background_Pressed: theme.tertiary,
          }}
        />,
      ]}
    />
  );
}
