import { memo, useMemo } from "react";
import { View } from "react-native";

import ConfigService from "@V2/Services/ConfigService";
import ThemeService from "@V2/Services/ThemeService";

import { Text } from "@V2/Text/index";

export const PathDisplay = memo((props: {
  currentPath: string
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (
    <View
      style={{
        backgroundColor: theme.background
      }}
    >
      <Text p
        style={{
          color: theme.font
        }}
      >
        {props.currentPath}
      </Text>
    </View>
  )
});