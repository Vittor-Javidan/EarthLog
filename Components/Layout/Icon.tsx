import React, { useState, useMemo } from 'react';
import { Pressable } from 'react-native';
import { ThemeDTO } from '../../Services/ThemeService';
import ConfigService from '../../Services/ConfigService';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Icon = {
  Menu: Menu,
  Home: Home,
  Settings: Settings,
  Language: Language,
  Theme: Theme,
  Project: Project,
  Root: Root,
};

function Menu(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="md-menu-sharp"
      onPress={props.onPress}
    />
  );
}

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

function Project(props: {
  onPress: () => void
}): JSX.Element {
  return (
    <Root
      iconName="map"
      onPress={props.onPress}
    />
  );
}

function Root(props: {
  iconName: IconName
  color?: string
  paddingHorizontal?: number
  paddingVertical?: number
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
        backgroundColor: pressed ? theme.onPressColorPrimary : undefined,
        paddingHorizontal: props.paddingHorizontal !== undefined ? props.paddingHorizontal : 20,
        paddingVertical: props.paddingVertical !== undefined ? props.paddingVertical : 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Ionicons
        name={props.iconName}
        adjustsFontSizeToFit={true}
        maxFontSizeMultiplier={0}
        style={{
          color: props.color,
          fontSize: 200,
        }}
      />
    </Pressable>
  );
}

export type IconName = (
  'home'                |
  'settings'            |
  'language'            |
  'color-palette'       |
  'md-menu-sharp'       |
  'map'                 |
  'pencil-sharp'        |
  'checkmark-done-sharp'|
  'close'               |
  'refresh-sharp'
)
