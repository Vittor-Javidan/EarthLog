import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View, Linking } from 'react-native';

import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { HapticsService } from '@V2/Services/HapticsService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Icon } from '@V2/Icon/index';
import { Text } from '@V2/Text/index';

export const SocialMediaButtons = memo(() => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 65,
        gap: 10,
      }}
    >
      <YoutubeTutorialButton />
      <LinkedinCommunityButton />
    </View>
  );
});

const YoutubeTutorialButton = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.home[config.language], []);
  const YOUTUBE_COLOR = 'red';

  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    HapticsService.vibrate('success');
    ConfigService.config.language === 'pt-BR'
    ? Linking.openURL('https://www.youtube.com/channel/UCSn8QU6ZzMm-Qd66fWsbr2w')
    : Linking.openURL('https://www.youtube.com/channel/UCBLi8DgOv6LT9xH5c5_xqWw');
  }, []);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: pressed ? theme.background_active : YOUTUBE_COLOR,
        paddingVertical: 5,
        paddingLeft: 5,
        paddingRight: 10,
        elevation: 3,
      }}
    >
      <Text h1
        style={{
          color: pressed ? YOUTUBE_COLOR : theme.font,
          textAlign: 'left',
        }}
      >
        {R['Tutorials']}
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <Icon
          color={pressed ? YOUTUBE_COLOR : theme.font}
          iconName="logo-youtube"
          fontSize={20}
        />
      </View>
    </Pressable>
  );
});

const LinkedinCommunityButton = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.home[config.language], []);
  const LINKEDIN_COLOR = '#0e76a8';

  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    HapticsService.vibrate('success');
    Linking.openURL('https://www.linkedin.com/groups/9314360/');
  }, []);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: pressed ? theme.background_active : LINKEDIN_COLOR,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 5,
        elevation: 3,
      }}
    >
      <Text h1
        style={{
          color: pressed ? LINKEDIN_COLOR : theme.font,
        }}
      >
        {R['Community']}
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <Icon
          color={pressed ? LINKEDIN_COLOR : theme.font}
          iconName="logo-linkedin"
          fontSize={20}
        />
      </View>
    </Pressable>
  );
});
