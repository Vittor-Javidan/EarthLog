import React, { memo, useMemo } from 'react';

import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';
import VersionManager from '@VersionManager';

export const SettingsButtons = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  return (<>
    <Button.TextWithIcon
      title={'Beta'}
      iconName="shuffle"
      onPress={async () => VersionManager.switchVersion('V2')}
      theme={{
        font:              theme.font_Button,
        font_active:       theme.font_active,
        background:        theme.background_Button,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={'LTS V1'}
      iconName="shuffle"
      onPress={async () => VersionManager.switchVersion('V1')}
      theme={{
        font:              theme.font_Button,
        font_active:       theme.font_active,
        background:        theme.background_Button,
        background_active: theme.background_active,
      }}
    />
  </>);
});
