import { memo, useMemo } from "react";
import { ActivityIndicator, Pressable, View, ViewStyle } from "react-native";

import { ThemeService } from "@V2/Services_Core/ThemeService";
import { ConfigService } from "@V2/Services/ConfigService";

import { Icon } from "@V2/Icon/index";

export const Button_CurrentPosition = memo((props: {
  followUser: boolean
  showIndicator: boolean
  style?: ViewStyle
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  return props.showIndicator ? (
    <View
      style={[{
        backgroundColor: theme.background,
        padding: 10,
        borderRadius: 10,
      }, props.style]}
    >
      {props.showIndicator && (
        <ActivityIndicator
          size="large"
          color={theme.font}
        />
      )}
    </View>
  ) : (<>
    <Pressable
      onPress={props.onPress}
      style={[{
        backgroundColor: props.followUser ? theme.confirm : theme.background,
        padding: 10,
        borderRadius: 10,
      }, props.style]}
    >
      <Icon
        iconName={props.followUser ? 'gps-off' : 'crosshairs-gps'}
        color={props.followUser ? theme.background : theme.font}
        fontSize={35}
      />
    </Pressable>
  </>);
});
