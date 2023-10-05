import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function ScreenButtons(props: {
  onWidgetCreation: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const config          = useMemo(() => ConfigService.config, []);
  const theme           = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);
  const projectSettings = useMemo(() => CacheService.getProjectFromCache(id_project), []);

  async function onCreateWidget() {
    const newWidget = ProjectService.getWidgetData();
    await ProjectService.createWidget_Template(
      id_project,
      newWidget,
      () => {
        CacheService.addToAllWidgets_Template(newWidget);
        props.onWidgetCreation();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.ScreenButtons
      buttons={<>
        {projectSettings.rules.showCreateWidgetButton_Template && (
          <Button.RoundedIcon
            iconName="square"
            showPlusSign={true}
            buttonDiameter={60}
            onPress={() => onCreateWidget()}
            theme={{
              font: theme.font,
              font_Pressed: theme.confirm,
              background: theme.confirm,
              background_Pressed: theme.background_active,
            }}
          />
        )}
      </>}
    />
  );
}