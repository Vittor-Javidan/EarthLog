import React, { memo, useMemo } from 'react';

import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Button } from '@V1/Button/index';
import VersionManager from '@VersionManager';

export const SettingsButtons = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);

  return (<>
    <Button.TextWithIcon
      title={'Beta'}
      iconName="shuffle"
      onPress={async () => VersionManager.switchVersion('V2')}
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={'LTS V1'}
      iconName="shuffle"
      onPress={async () => VersionManager.switchVersion('V1')}
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
    />
  </>);
});
