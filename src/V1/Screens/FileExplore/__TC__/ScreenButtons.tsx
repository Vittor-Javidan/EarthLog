import React, { memo, useMemo } from 'react';

import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';
import { Layout } from '@V1/Layout/index';

export const ScreenButtons = memo((props: {
  onCloseFolder: () => void
  onGoToRoot: () => void
  onGoToHome: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  return (
    <Layout.ScreenButtons
      buttons={<>
        <Button.RoundedIcon
          iconName="home"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => props.onGoToHome()}
          theme={{
            font:              theme.font,
            font_active:       theme.backgroud,
            background:        theme.backgroud,
            background_active: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="folder-home"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => props.onGoToRoot()}
          theme={{
            font:              theme.font,
            font_active:       theme.backgroud,
            background:        theme.backgroud,
            background_active: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="return-down-back-sharp"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => props.onCloseFolder()}
          theme={{
            font:              theme.font,
            font_active:       theme.backgroud,
            background:        theme.backgroud,
            background_active: theme.background_active,
          }}
        />
      </>}
    />
  );
});
