import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View, Linking } from 'react-native';

import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Icon } from '@V1/Icon/index';
import { Text } from '@V1/Text/index';

export const SocialMediaButtons = memo(() => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 80,
        gap: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 10,
        }}
      >
        <YoutubeTutorialButton />
        <RoadMapButton />
      </View>
      <View
        style={{ flex: 1 }}
      >
        <LinkedinCommunityButton />
      </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: pressed ? theme.background_active : YOUTUBE_COLOR,
        paddingLeft: 5,
        paddingRight: 10,
        elevation: 3,
      }}
    >
      <Icon
        color={pressed ? YOUTUBE_COLOR : theme.font}
        iconName="logo-youtube"
      />
      <Text h3
        style={{
          color: pressed ? YOUTUBE_COLOR : theme.font,
          fontWeight: '900',
        }}
      >
        {R['Tutorials']}
      </Text>
    </Pressable>
  );
});

const RoadMapButton = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.home[config.language], []);
  const ROADMAP_COLOR = 'orange';

  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    HapticsService.vibrate('success');
    alert(config.language === 'pt-BR' ? 'Website ainda não construído' : 'Website not builded yet');
    // Linking.openURL('https://www.google.com/');
  }, []);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: pressed ? theme.background_active : ROADMAP_COLOR,
        paddingHorizontal: 10,
        elevation: 3,
      }}
    >
      <Text h3
        style={{
          color: pressed ? ROADMAP_COLOR : theme.font,
          fontWeight: '900',
        }}
      >
        {R['ROADMAP']}
      </Text>
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
        paddingLeft: 10,
        paddingRight: 5,
        elevation: 3,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          paddingTop: 5,
        }}
      >
        <Icon
          color={pressed ? LINKEDIN_COLOR : theme.font}
          iconName="logo-linkedin"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 5,
        }}
      >
        <Text h1
          style={{
            color: pressed ? LINKEDIN_COLOR : theme.font,
            fontWeight: '900',
          }}
        >
          {R['Community']}
        </Text>
      </View>
    </Pressable>
  );
});
