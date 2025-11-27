import { memo, useEffect, useMemo, useState } from "react";
import { File } from 'expo-file-system';

import { ThemeService } from "@V1/Services_Core/ThemeService";
import { ConfigService } from "@V1/Services/ConfigService";
import { Text } from "@V1/Text/index";
import { Layout } from "@V1/Layout/index";
import { PathDisplay } from "./PathDisplay";

export const TextDisplay = memo((props: {
  textFilePath: string
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [fileContent, setFileContent] = useState<string>('');

  useEffect(() => {
    const file = new File(props.textFilePath);
    const content = file.textSync();
    const jsonObject = JSON.parse(content);
    setFileContent(JSON.stringify(jsonObject, null, 2));
  }, []);

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
        {fileContent}
      </Text>
    </Layout.ScrollView>
  </>)
})