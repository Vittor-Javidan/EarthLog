import React, { useState, useMemo } from 'react';
import { GestureResponderEvent, Pressable, Text } from 'react-native';
import * as Vibration from 'expo-haptics';

import { ThemeDTO } from '@Types/index';

import ThemeService from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';

export default function DrawerButton(props: {
  title: string
  overrideBackgroundColor?: string
  overrideTextColor?: string
  onPress: ((event: GestureResponderEvent) => void)
}): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  const backgroundColor = props.overrideBackgroundColor ? props.overrideBackgroundColor : theme.tertiary;
  const textColor = props.overrideTextColor ? props.overrideTextColor : theme.onTertiary;

  return (
    <Pressable
      onPressIn={async () => {
        setPressed(true);
        await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
      }}
      onPressOut={() => {
        setPressed(false);
      }}
      onPress={(event) => { props?.onPress(event); }}
      style={{
        backgroundColor: pressed ? theme.onPressColorPrimary : backgroundColor,
        opacity: pressed ? 0.9 : 1,
        padding: 10,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        maxFontSizeMultiplier={0}
        style={{
          color: textColor,
          fontSize: ThemeService.FONTS.h2,
        }}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}
