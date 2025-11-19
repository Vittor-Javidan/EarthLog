import React, { memo, useMemo } from 'react';

import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Button } from '@V2/Button/index';
import { Layout } from '@V2/Layout/index';

export const ScreenButtons = memo((props: {
  onCreateCredential: () => void
  onHomePress: () => void
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
          onPress={() => props.onHomePress()}
          theme={{
            font:              theme.font,
            font_active:       theme.backgroud,
            background:        theme.backgroud,
            background_active: theme.background_active,
          }}
        />
        <Button.RoundedIcon
          iconName="card-outline"
          showPlusSign
          buttonDiameter={60}
          onPress={() => props.onCreateCredential()}
          theme={{
            font:              theme.font,
            font_active:       theme.confirm,
            background:        theme.confirm,
            background_active: theme.background_active,
          }}
        />
      </>}
    />
  );
});
