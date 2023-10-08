import React, { useCallback, useMemo } from 'react';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export default function ScreenButtons(props: {
  onProjectCreation: () => void
}) {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  const createProject = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'project creation',
    }, () => props.onProjectCreation());
  }, [props.onProjectCreation]);

  const downloadProjects = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'download projects',
    }, () => props.onProjectCreation());
  }, [props.onProjectCreation]);

  return (
    <Layout.ScreenButtons
      buttons={<>
        <Button.RoundedIcon
          iconName="cloud-download-outline"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={async () => await downloadProjects()}
          theme={{
            font: theme.font,
            font_Pressed: theme.backgroud,
            background: theme.backgroud,
            background_Pressed: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="folder"
          showPlusSign={true}
          buttonDiameter={60}
          onPress={async () => await createProject()}
          theme={{
            font: theme.font,
            font_Pressed: theme.confirm,
            background: theme.confirm,
            background_Pressed: theme.background_active,
          }}
        />
      </>}
    />
  );
}
