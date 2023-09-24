import React, { useMemo, useState } from 'react';
import { Pressable, View, Linking } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import { Text } from '@Text/index';
import { Icon } from '@Icon/index';
import ApticsService from '@Services/ApticsService';

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

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
  }

  function onPress() {
    ApticsService.vibrate('success');
    Linking.openURL('https://www.google.com/');
  }

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
        backgroundColor: pressed ? props.theme.background : 'red',
        paddingLeft: 5,
        paddingRight: 10,
      }}
    >
      <Icon
        color={pressed ? 'red' : props.theme.font}
        iconName="logo-youtube"
      />
      <Text h3
        style={{
          color: pressed ? 'red' : props.theme.font,
          fontWeight: '900',
        }}
      >
        {'Tutorials'}
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

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
  }

  function onPress() {
    ApticsService.vibrate('success');
    Linking.openURL('https://www.google.com/');
  }

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
        backgroundColor: pressed ? props.theme.background : 'orange',
        paddingHorizontal: 10,
      }}
    >
      <Text h3
        style={{
          color: pressed ? 'orange' : props.theme.font,
          fontWeight: '900',
        }}
      >
        {'ROADMAP'}
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

  const [pressed, setPressed] = useState<boolean>(false);

  function onPressIn() {
    setPressed(true);
    ApticsService.vibrate('success');
  }

  function onPress() {
    ApticsService.vibrate('success');
    Linking.openURL('https://www.google.com/');
  }

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: pressed ? props.theme.background : '#0e76a8',
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
          color={pressed ? '#0e76a8' : props.theme.font}
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
            color: pressed ? '#0e76a8' : props.theme.font,
            fontWeight: '900',
          }}
        >
          {'Community'}
        </Text>
      </View>
    </Pressable>
  );
}
