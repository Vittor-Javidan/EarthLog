import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import * as Vibration from 'expo-haptics';
import Ionicons from '@expo/vector-icons/Ionicons';

import ConfigService from '@Services/ConfigService';

export default function Checkbox(props: {
  value: boolean
  onChange: (checked: boolean) => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  async function onChange() {
    props.value
    ? await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning)
    : await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
    props.onChange(!props.value);
  }

  return (
    <View
      style={{ flexDirection: 'row' }}
    >
      <Pressable
        onPress={async () => await onChange()}
        style={{
          backgroundColor: props.value ? theme.confirm : theme.primary,
          justifyContent: 'center',
          alignItems: 'center',
          height: 25,
          width: 25,
          borderRadius: 6,
          opacity: 1,
        }}
      >
        <Ionicons
          name="checkmark-sharp"
          adjustsFontSizeToFit={true}
          maxFontSizeMultiplier={0}
          style={{
            color: theme.primary,
            fontSize: 200,
          }}
        />
      </Pressable>
    </View>
  );
}
