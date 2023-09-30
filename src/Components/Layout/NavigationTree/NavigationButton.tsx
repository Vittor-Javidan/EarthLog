import React, { useState, useMemo, memo, useCallback } from 'react';
import { Pressable } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import HapticsService from '@Services/HapticsService';

import { Icon, IconName } from '@Icon/index';

export const NavigationButton = memo((props: {
  iconName: IconName
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.navigationTreeButton, []);
  const [pressed, setPressed] = useState<boolean>(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('success');
  }, [props.onPress]);

  return (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
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
});
