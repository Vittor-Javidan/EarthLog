import { memo, useCallback, useState } from "react";
import { Pressable } from "react-native";

import {
  WidgetTheme
} from "@V1/Types";

import { HapticsService } from "@V1/Services/HapticsService";
import { Icon } from "@V1/Icon/index";

export const MapButton = memo((props: {
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
        backgroundColor: pressed ? props.theme.confirm : props.theme.font,
        borderRadius: 6,
      }}
    >
      <Icon
        iconName='google-maps'
        fontSize={25}
        color={pressed ? props.theme.font : props.theme.background}
      />
    </Pressable>
  );
});
