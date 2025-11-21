import { memo, useCallback, useState } from "react";
import { Pressable } from "react-native";

import { WidgetTheme } from "@V2/Types/ProjectTypes";
import { HapticsService } from "@V2/Services/HapticsService";

import { Icon } from "@V2/Icon/index";

export const SetMapMarkerPositionButton = memo((props: {
  isPinned: boolean
  onPress: () => void
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

  const backgroundColor = props.isPinned
  ? props.theme.confirm
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
        backgroundColor: pressed ? props.theme.background : backgroundColor,
        borderRadius: 6,
        width: 40,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon
        iconName='pushpin'
        fontSize={20}
        color={pressed ? props.theme.font : fontColor}
      />
    </Pressable>
  );
});