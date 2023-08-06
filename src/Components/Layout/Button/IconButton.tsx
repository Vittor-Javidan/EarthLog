import React, { useState, useMemo } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import { ThemeDTO } from '@Types/index';
import Icon, { IconName } from '../Icon';

import ConfigService from '@Services/ConfigService';

export default function IconButton(props: {
  iconName: IconName
  color_background?: string
  color?: string
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}): JSX.Element {

  const [pressed, setPressed] = useState<boolean>(false);
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      style={[{
        flexDirection: 'row',
        backgroundColor: pressed ? theme.onPressColorPrimary : props.color_background,
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
