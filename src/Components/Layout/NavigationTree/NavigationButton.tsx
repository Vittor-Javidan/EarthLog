import React, { useState, useMemo } from 'react';
import { Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Icon, IconName } from '@Icon/index';

export default function NavigationButton(props: {
  iconName: IconName
  onPress?: () => void
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme], []);
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      onPressIn={async () => {
        setPressed(true);
        await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
      }}
      onPressOut={() => {
        setPressed(false);
      }}
      onPress={props.onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? theme.onPrimary : theme.primary,
        paddingHorizontal: 20,
        borderRadius: 5,
      }}
    >
      <Icon
        iconName={props.iconName}
        color={pressed ? theme.primary : theme.onPrimary}
      />
    </Pressable>
  );
}
