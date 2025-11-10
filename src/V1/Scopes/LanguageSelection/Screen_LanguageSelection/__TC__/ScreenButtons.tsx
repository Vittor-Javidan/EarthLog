import React, { memo, useMemo } from 'react';

import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { Button } from '@V1/Button/index';

export const ScreenButtons = memo((props: {
  onArrowBack: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  return (
    <Layout.ScreenButtons
      buttons={
        <Button.RoundedIcon
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => props.onArrowBack()}
          theme={{
            font:              theme.font,
            font_active:       theme.backgroud,
            background:        theme.backgroud,
            background_active: theme.background_active,
          }}
        />
      }
    />
  );
});
