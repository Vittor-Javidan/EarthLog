import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { Icon } from '@Icon/index';
import { GPSInputTheme } from '../ThemeType';

export default function FooterButtons(props: {
  theme: GPSInputTheme
  onCancel: () => void
  onSave: () => void
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
      }}
    >
      <FooterButton
        iconName="close"
        theme={props.theme}
        onPress={() => props.onCancel()}
      />
      <FooterButton
        iconName="save"
        onPress={() => props.onSave()}
        theme={props.theme}
      />
    </View>
  );
}

function FooterButton(props: {
  iconName: 'close' | 'save'
  theme: GPSInputTheme
  onPress: () => void
}) {

  const [pressed, setPressed] = useState<boolean>(false);
  const backgroundColor = props.iconName === 'close' ? props.theme.wrong : props.theme.confirm;

  function onPress() {
    props.onPress();
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  function onPressIn() {
    setPressed(true);
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? props.theme.font : backgroundColor,
        flex: 1,
        height: 40,
        paddingHorizontal: 20,
        paddingVertical: props.iconName === 'close' ? 0 : 5,
        borderRadius: 10,
      }}
    >
      <Icon
        iconName={props.iconName}
        color={props.theme.background}
      />
    </Pressable>
  );
}
