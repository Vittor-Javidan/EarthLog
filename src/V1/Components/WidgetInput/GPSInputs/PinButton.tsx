import { memo, useCallback, useState } from "react";
import { Pressable } from "react-native";

import {
  WidgetTheme
} from "@V1/Types";

import { HapticsService } from "@V1/Services/HapticsService";
import { Icon } from "@V1/Icon/index";

export const PinButton = memo((props: {
  onPress: () => void
  isPinned: boolean
  theme: WidgetTheme
}) => {

  const [pressed, setPressed] = useState(false);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPressOut = useCallback(() => {
    setPressed(false);
  }, []);

  const activeBackgroundColor = props.isPinned
  ? props.theme.font
  : props.theme.confirm;

  const backgroundColor = props.isPinned
  ? props.theme.confirm
  : props.theme.font;

  const activeFontColor = props.isPinned
  ? props.theme.background
  : props.theme.font;

  const fontColor = props.isPinned
  ? props.theme.font
  : props.theme.background;

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        paddingVertical: 10,
        backgroundColor: pressed ? activeBackgroundColor : backgroundColor,
        borderRadius: 6,
      }}
    >
      <Icon
        iconName='pushpin'
        fontSize={25}
        color={pressed ? activeFontColor : fontColor}
      />
    </Pressable>
  );
});
