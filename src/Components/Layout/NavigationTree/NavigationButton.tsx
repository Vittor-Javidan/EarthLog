import React, { useState, useMemo } from 'react';
import { Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import { Icon, IconName } from '@Icon/index';

export default function NavigationButton(props: {
  iconName: IconName
  onPress?: () => void
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
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
        backgroundColor: pressed ? theme.tertiary : undefined,
        paddingHorizontal: 20,
        borderRadius: 5,
      }}
    >
      <Icon
        iconName={props.iconName}
        color={pressed ? theme.onTertiary : theme.onPrimary}
      />
    </Pressable>
  );
}
