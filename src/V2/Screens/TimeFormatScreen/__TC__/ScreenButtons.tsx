import React, { memo, useMemo } from 'react';

import { navigate } from '@V2/Globals/NavigationControler';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';
import { Layout } from '@V2/Layout/index';

export const ScreenButtons = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.screenButtons, []);

  return (
    <Layout.ScreenButtons
      buttons={<>
        <Button.RoundedIcon
          iconName="arrow-back"
          showPlusSign={false}
          buttonDiameter={60}
          onPress={() => navigate('SETTINGS SCOPE')}
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
