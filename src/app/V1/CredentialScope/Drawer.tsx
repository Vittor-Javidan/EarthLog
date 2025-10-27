import React, { memo, useMemo } from 'react';
import { Linking } from 'react-native';

import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Button } from '@V1/Button/index';

const Drawer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.credential[config.language], []);

  return (<>
    <Button.TextWithIcon
      title={R['Create a server']}
      iconName="server"
      onPress={() => Linking.openURL('https://github.com/Vittor-Javidan/EarthLogServerExample')}
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
    />
  </>);
});

export default Drawer;
