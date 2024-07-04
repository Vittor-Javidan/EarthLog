import React, { useMemo, memo, useCallback } from 'react';
import { Linking, Platform } from 'react-native';

import SubscriptionManager from '@SubscriptionManager';

import { navigate } from '@V2/Globals/NavigationControler';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import AlertService from '@V2/Services/AlertService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';

export const Drawer = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.scope.home[config.language], []);

  const buySubscription = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'Buy Subscription',
      message: R['Sponsor this app!'],
    }, () => {});
  }, []);

  return (<>
    {SubscriptionManager.getPlan() === 'Free' && (
      <Button.TextWithIcon
        title={R['Sponsor this app!']}
        iconName="wallet-outline"
        onPress={async () => await buySubscription()}
        theme={{
          font:              theme.font,
          font_active:       theme.font_active,
          background:        theme.background,
          background_active: theme.background_active,
        }}
      />
    )}
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
    {Platform.OS === 'android' && (
      <Button.TextWithIcon
        title={R['Google Play subscriptions']}
        iconName="logo-google-playstore"
        onPress={() => Linking.openURL('https://play.google.com/store/account/subscriptions')}
        theme={{
          font:              theme.font,
          font_active:       theme.font_active,
          background:        theme.background,
          background_active: theme.background_active,
        }}
      />
    )}
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
