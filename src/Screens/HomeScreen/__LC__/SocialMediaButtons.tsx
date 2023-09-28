import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, View, Linking } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import { Text } from '@Text/index';
import { Icon } from '@Icon/index';
import HapticsService from '@Services/HapticsService';
import { translations } from '@Translations/index';

export function SocialMediaButtons() {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

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
        <YoutubeTutorialButton
          theme={theme}
        />
        <RoadMapButton
          theme={theme}
        />
      </View>
      <View
        style={{ flex: 1 }}
      >
        <LinkedinCommunityButton
          theme={theme}
        />
      </View>
    </View>
  );
}

function YoutubeTutorialButton(props: {
  theme: {
    font: string
    background: string
  }
}) {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.homeScreen[config.language], []);
  const YOUTUBE_COLOR = 'red';

  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    HapticsService.vibrate('success');
    Linking.openURL('https://www.google.com/');
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
        backgroundColor: pressed ? props.theme.background : YOUTUBE_COLOR,
        paddingLeft: 5,
        paddingRight: 10,
      }}
    >
      <Icon
        color={pressed ? YOUTUBE_COLOR : props.theme.font}
        iconName="logo-youtube"
      />
      <Text h3
        style={{
          color: pressed ? YOUTUBE_COLOR : props.theme.font,
          fontWeight: '900',
        }}
      >
        {R['Tutorials']}
      </Text>
    </Pressable>
  );
}

function RoadMapButton(props: {
  theme: {
    font: string
    background: string
  }
}) {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.homeScreen[config.language], []);
  const ROADMAP_COLOR = 'orange';

  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    HapticsService.vibrate('success');
    Linking.openURL('https://www.google.com/');
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
        backgroundColor: pressed ? props.theme.background : ROADMAP_COLOR,
        paddingHorizontal: 10,
      }}
    >
      <Text h3
        style={{
          color: pressed ? ROADMAP_COLOR : props.theme.font,
          fontWeight: '900',
        }}
      >
        {R['ROADMAP']}
      </Text>
    </Pressable>
  );
}

function LinkedinCommunityButton(props: {
  theme: {
    font: string
    background: string
  }
}) {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.homeScreen[config.language], []);
  const LINKEDIN_COLOR = '#0e76a8';

  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    HapticsService.vibrate('success');
    Linking.openURL('https://www.google.com/');
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
        backgroundColor: pressed ? props.theme.background : LINKEDIN_COLOR,
        paddingLeft: 10,
        paddingRight: 5,
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
          color={pressed ? LINKEDIN_COLOR : props.theme.font}
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
            color: pressed ? LINKEDIN_COLOR : props.theme.font,
            fontWeight: '900',
          }}
        >
          {R['Community']}
        </Text>
      </View>
    </Pressable>
  );
}
