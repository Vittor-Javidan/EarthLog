import React, { useMemo, memo } from 'react';
import { Linking } from 'react-native';

import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Button } from '@V2/Button/index';

export const Drawer = memo((props: {
  onExportedFilesPress: () => void
  onCredentialsPress: () => void
  onSettingsPress: () => void
  onFileExplorerPress: () => void
  onChangeVersionPress: () => void
  onSubscriptionsPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.home[config.language], []);

  return (<>
    <Button.TextWithIcon
      title={R['Subscriptions']}
      iconName="logo-google-playstore"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => props.onSubscriptionsPress()}
    />
    <Button.TextWithIcon
      title={R['Exported Files']}
      iconName="file-export"
      onPress={() => props.onExportedFilesPress()}
      iconSize={34}
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
    />
    <Button.TextWithIcon
      title={R['Credentials']}
      iconName="card-outline"
      onPress={() => props.onCredentialsPress()}
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
      onPress={() => props.onSettingsPress()}
    />
    <Button.TextWithIcon
      title={R['File Explorer']}
      iconName="search-outline"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => props.onFileExplorerPress()}
    />
    <Button.TextWithIcon
      title={R['Change version']}
      iconName="shuffle"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => props.onChangeVersionPress()}
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
      title={R['Release Notes']}
      iconName="new-releases"
      theme={{
        font:              theme.font,
        font_active:       theme.font_active,
        background:        theme.background,
        background_active: theme.background_active,
      }}
      onPress={() => Linking.openURL('https://github.com/Vittor-Javidan/EarthLog/blob/main/docs/ReleaseNotes_V2.md')}
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
