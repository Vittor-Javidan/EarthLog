import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function ScreenButtons(props: {
  onWidgetCreation: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;

  const { theme } = useMemo(() => ConfigService.config, []);

  async function onCreateWidget() {
    await ProjectService.createWidget_Template(
      id_project,
      ProjectService.getWidgetData(),
      async () => {
        await CacheService.loadAllWidgets_Template(id_project);
        props.onWidgetCreation();
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
          onPress={() => navigate('HOME SCOPE')}
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
