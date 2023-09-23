import React, { useState, useMemo } from 'react';
import { Pressable } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import ApticsService from '@Services/ApticsService';

import { Icon, IconName } from '@Icon/index';

export default function NavigationButton(props: {
  iconName: IconName
  onPress?: () => void
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.navigationTreeButton, []);
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      onPressIn={async () => {
        setPressed(true);
        ApticsService.vibrate('success');
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
        backgroundColor: pressed ? theme.background_active : theme.background,
        paddingHorizontal: 20,
        borderRadius: 5,
      }}
    >
      <Icon
        iconName={props.iconName}
        color={pressed ? theme.font_active : theme.font}
      />
    </Pressable>
  );
}
