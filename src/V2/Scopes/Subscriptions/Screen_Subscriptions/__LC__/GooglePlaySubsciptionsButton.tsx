import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View, Linking } from 'react-native';

import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { HapticsService } from '@V2/Services/HapticsService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Icon } from '@V2/Icon/index';
import { Text } from '@V2/Text/index';

export const GooglePlaySubscriptionsButton = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.subscriptions[config.language], []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    HapticsService.vibrate('success');
    Linking.openURL('https://play.google.com/store/account/subscriptions');
  }, []);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: pressed ? theme.background_active : theme.background,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 3,
        gap: 50,
      }}
    >
      <Text h2
        style={{
          color: pressed ? theme.font_active : theme.font,
          textAlign: 'left',
          flexShrink: 1,
          flexWrap: 'wrap',
        }}
      >
        {R['Play Store Subscriptions']}
      </Text>
      <Icon
        color={pressed ? theme.font_active : theme.font}
        iconName="logo-google-playstore"
        fontSize={50}
      />
    </Pressable>
  );
});