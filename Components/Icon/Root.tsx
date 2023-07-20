import React, { useState, useMemo } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ConfigService from '@Services/ConfigService';
import { ThemeDTO } from '@Services/ThemeService';

export default function Root(props: {
  iconName: IconName
  color?: string
  style?: StyleProp<ViewStyle>
  onPress: () => void
}): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      style={[{
        backgroundColor: pressed ? theme.onPressColorPrimary : undefined,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }, props.style]}
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
