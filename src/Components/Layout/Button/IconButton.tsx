import React, { useState, useMemo } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';

import Icon, { IconName } from '../Icon';

export default function IconButton(props: {
  iconName: IconName
  color_background?: string
  color_onPressed?: string
  color?: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [pressed, setPressed] = useState<boolean>(false);
  const pressedColor = props.color_onPressed ? props.color_onPressed : theme.onPressColorPrimary;

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
      style={[{
        flexDirection: 'row',
        backgroundColor: pressed ? pressedColor : props.color_background,
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }, props.style]}
    >
      <Icon
        iconName={props.iconName}
        color={props.color}
      />
    </Pressable>
  );
}
