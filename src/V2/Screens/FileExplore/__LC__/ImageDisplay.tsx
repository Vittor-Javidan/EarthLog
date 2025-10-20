import { memo, useMemo } from "react";
import { View, Image } from "react-native";

import ConfigService from "@V2/Services/ConfigService";
import ThemeService from "@V2/Services/ThemeService";

import { PathDisplay } from "./PathDisplay";

export const ImageDisplay = memo((props: {
  imagePath: string
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (<>
    <PathDisplay
      currentPath={props.imagePath}
    />
    <View
      style={{
        flex: 1,
        paddingTop: 0,
        paddingBottom: 150,
        backgroundColor: theme.background,
      }}
    >
      <Image
        source={{ uri: props.imagePath }}
        style={{
          flex: 1,
          resizeMode: 'contain',
          backgroundColor: ''
        }}
      />
    </View>
  </>)
});