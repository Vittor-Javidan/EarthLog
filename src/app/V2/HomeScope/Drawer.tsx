import React, { useMemo, memo } from 'react';
import { Linking } from 'react-native';

import { navigate } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';

export const Drawer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.home[config.language], []);

  return (<>
    <Button.TextWithIcon
      title={R['Credentials']}
      iconName="card-outline"
      onPress={() => navigate('CREDENTIAL SCOPE')}
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Settings']}
      iconName="settings-outline"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => navigate('SETTINGS SCOPE')}
    />
    <Button.TextWithIcon
      title={R['Change version']}
      iconName="shuffle-outline"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => navigate('VERSION CHANGE SCOPE')}
    />
    <Button.TextWithIcon
      title={R['GitHub']}
      iconName="logo-github"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => Linking.openURL('https://github.com/Vittor-Javidan/EarthLog')}
    />
    <Button.TextWithIcon
      title={R['Privacy Policy']}
      iconName="shield-outline"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => Linking.openURL('https://github.com/Vittor-Javidan/PRIVACY_POLICIES/blob/main/EARTH_LOG.md')}
    />
  </>);
});
