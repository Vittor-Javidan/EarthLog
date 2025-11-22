import React, { memo, useCallback, useMemo, useState } from "react";
import { Pressable, ViewStyle } from "react-native";

import { ThemeService } from "@V2/Services_Core/ThemeService";
import { ConfigService } from "@V2/Services/ConfigService";
import { HapticsService } from "@V2/Services/HapticsService";

import { Icon } from "@V2/Icon/index";

export const Button_Filter = memo((props: {
  onPress: () => void
  style?: ViewStyle
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [pressed, setPressed] = useState(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success')
  }, []);

  const onPressOut = useCallback(() => {
    setPressed(false);
  }, []);

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[{
        backgroundColor: pressed ? theme.font : theme.background,
        padding: 10,
        borderRadius: 10,
      }, props.style]}
    >
      <Icon
        iconName={'filter'}
        color={pressed ? theme.background : theme.font}
        fontSize={35}
      />
    </Pressable>
  )
});
