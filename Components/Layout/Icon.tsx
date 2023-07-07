import React, { useState, useMemo } from 'react';
import { Pressable } from 'react-native';
import { ThemeDTO } from '../../Services/ThemeService';
import ConfigService from '../../Services/ConfigService';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Icon = {
  Home: Home,
  Settings: Settings,
  Language: Language,
  Theme: Theme,
};

type IconName = 'home' | 'settings' | 'language' | 'color-palette'

function Home(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="home"
      onPress={props.onPress}
    />
  );
}

function Settings(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="settings"
      onPress={props.onPress}
    />
  );
}

function Language(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="language"
      onPress={props.onPress}
    />
  );
}

function Theme(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="color-palette"
      onPress={props.onPress}
    />
  );
}

function Root(props: {
  iconName: IconName
  onPress: () => void
}): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      style={{
        backgroundColor: pressed ? theme.onPressColorPrimary : theme.primary,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Ionicons
        name={props.iconName}
        adjustsFontSizeToFit={true}
        maxFontSizeMultiplier={0}
        style={{
          color: theme.onPrimary,
          fontSize: 200,
        }}
      />
    </Pressable>
  );
}
