import { memo, useMemo } from "react";
import { Pressable, View } from "react-native";

import { FileType } from "@V1/Services_Files/FileExploreService";
import { ConfigService } from "@V1/Services/ConfigService";
import { ThemeService } from "@V1/Services_Core/ThemeService";

import { Text } from '@V1/Text/index';
import { Icon } from "@V1/Icon/index";
import { Layout } from "@V1/Layout/index";

import { PathDisplay } from "./PathDisplay";

export const ContentsDisplay = memo((props: {
  currentPath: string,
  contents: FileType[],
  onPressFolder: (folderName: string) => void,
  onPressJsonFile: (textFileName: string) => void,
  onPressImageFile: (imageName: string) => void,
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (<>
    <PathDisplay
      currentPath={props.currentPath}
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
      <ContentButtons
        contents={props.contents}
        onPressFolder={(folderName) => props.onPressFolder(folderName)}
        onPressJsonFile={(textFileName) => props.onPressJsonFile(textFileName)}
        onPressImageFile={(imageName) => props.onPressImageFile(imageName)}
      />
    </Layout.ScrollView>
  </>)
})

export const ContentButtons = memo((props: {
  contents: FileType[]
  onPressFolder: (folderName: string) => void
  onPressJsonFile: (fileName: string) => void
  onPressImageFile: (fileName: string) => void
}) => {

  const allFolders = props.contents.map(content => {
    if (content.type === 'directory') {
      const folderName = content.name;
      return (
        <FolderButton
          key={`key_folder_${folderName}`}
          name={folderName}
          onPress={() => props.onPressFolder(folderName)}
        />
      );
    }
  })

  const allJsonFiles = props.contents.map(content => {
    if (content.type === 'file') {
      const fileName = content.name;
      if (fileName.endsWith('.json')) {
        return (
          <JsonFileButton
            key={`key_file_${fileName}`}
            name={fileName}
            onPress={() => props.onPressJsonFile(fileName)}
          />
        );
      }
    }
  })

  const allImageFiles = props.contents.map(content => {
    if (content.type === 'file') {
      const fileName = content.name;
      if (fileName.endsWith('.jpg')) {
        return (
          <ImageFileButton
            key={`key_file_${fileName}`}
            name={fileName}
            onPress={() => props.onPressImageFile(fileName)}
          />
        );
      }
    }
  })

  const allOtherFiles = props.contents.map(content => {
    if (content.type === 'file') {
      const fileName = content.name;
      if (!fileName.endsWith('.json') && !fileName.endsWith('.jpg')) {
        return (
          <OtherFiles
            key={`key_file_${fileName}`}
            name={fileName}
          />
        );
      }
    }
  })

  return (<>
    {allFolders}
    {allJsonFiles}
    {allImageFiles}
    {allOtherFiles}
  </>);
});

const FolderButton = memo((props: {
  name: string
  onPress: () => void
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        paddingVertical: 10,
      }}
    >
      <Icon iconName="folder" fontSize={18} color={theme.font} />
      <Text p
        style={{
          color: theme.font
        }}
      >
        {props.name}
      </Text>
    </Pressable>
  );
});

const JsonFileButton = memo((props: {
  name: string
  onPress: () => void
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        paddingVertical: 10,
      }}
    >
      <Icon iconName="code-json" fontSize={18} color={theme.font} />
      <Text p
        style={{
          color: theme.font
        }}
      >
        {props.name}
      </Text>
    </Pressable>
  );
});

const ImageFileButton = memo((props: {
  name: string
  onPress: () => void
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        paddingVertical: 10,
      }}
    >
      <Icon iconName="image" fontSize={18} color={theme.font} />
      <Text p
        style={{
          color: theme.font
        }}
      >
        {props.name}
      </Text>
    </Pressable>
  );
});

const OtherFiles = memo((props: {
  name: string
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        paddingVertical: 10,
      }}
    >
      <Icon iconName="file" fontSize={18} color={theme.font} />
      <Text p
        style={{
          color: theme.font
        }}
      >
        {props.name}
      </Text>
    </View>
  );
});