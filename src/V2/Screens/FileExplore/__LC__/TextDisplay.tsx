import { memo, useMemo } from "react";

import { ThemeService } from "@V2/Services_Core/ThemeService";
import { ConfigService } from "@V2/Services/ConfigService";

import { Text } from "@V2/Text/index";
import { Layout } from "@V2/Layout/index";
import { PathDisplay } from "./PathDisplay";

export const TextDisplay = memo((props: {
  textFilePath: string
  textContent: string
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (<>
    <PathDisplay
      currentPath={props.textFilePath}
    />
    <Layout.ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        gap: 1,
      }}
      style={{
        backgroundColor: theme.background,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: theme.font,
          fontSize: 12
        }}
      >
        {props.textContent}
      </Text>
    </Layout.ScrollView>
  </>)
})