import React, { useMemo } from 'react';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';
import ThemeService from '@Services/ThemeService';

export default function ScreenButtons(props: {
  onProjectCreation: () => void
}) {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  async function createProject() {
    AlertService.handleAlert(true, {
      question: '',
      type: 'project creation',
    }, () => {
      props.onProjectCreation();
    });
  }

  return (
    <Layout.ScreenButtons
      buttons={
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
      }
    />
  );
}
