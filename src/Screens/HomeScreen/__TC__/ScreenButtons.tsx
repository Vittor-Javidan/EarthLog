import React, { memo, useMemo } from 'react';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Layout } from '@Layout/index';

export const ScreenButtons = memo((props: {
  onCreateProject: () => void
  onDownloadProject: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  return (
    <Layout.ScreenButtons
      buttons={<>
        <Button.RoundedIcon
          iconName="cloud-download-outline"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={props.onDownloadProject}
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
          onPress={props.onCreateProject}
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
});
