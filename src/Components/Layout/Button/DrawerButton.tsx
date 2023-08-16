import React, { useState, useMemo } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import RootText from '../Text/Root';

export default function DrawerButton(props: {
  title: string
  overrideBackgroundColor?: string
  overrideTextColor?: string
  onPress: ((event: GestureResponderEvent) => void)
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [pressed, setPressed] = useState<boolean>(false);
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
        height: 55,
      }}
    >
      <RootText
        style={{
          color: textColor,
          fontSize: 200,
        }}
      >
        {props.title}
      </RootText>
    </Pressable>
  );
}
