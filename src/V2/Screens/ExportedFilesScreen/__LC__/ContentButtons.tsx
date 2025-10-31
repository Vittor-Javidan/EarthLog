import React, { memo, useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { ConfigService } from "@V2/Services/ConfigService";
import { ThemeService } from "@V2/Services_Core/ThemeService";

import { Icon, IconName } from "@V2/Icon/index";
import { Text } from "@V2/Text/index";

export const ContentButtons = memo((props: {
  contents: string[]
  onPressFile: (fileName: string) => void
  onDeleteFile: (fileName: string) => void
}) => {

  const allFiles = props.contents.map(fileName => {

    const extension = fileName.split('.').pop();
    let iconName: IconName;

    switch (extension) {
      case 'docx': iconName = 'file-word'; break;
      case 'csv' : iconName = 'file-csv';  break;
      default    : iconName = 'file';      break;
    }

    return (
      <File
        name={fileName}
        extensionIcon={iconName}
        key={`key_file_${fileName}`}
        onPress={() => props.onPressFile(fileName)}
        onDelete={() => props.onDeleteFile(fileName)}
      />
    )
  })

  return (<>
    {allFiles}
  </>);
});

const File = memo((props: {
  name: string
  extensionIcon: IconName
  onPress: () => void
  onDelete: () => void
}) => {
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [pressed        , setPressed        ] = useState(false);
  const [isDeletePressed, setIsDeletePressed] = useState(false);

  let paddingLeft;
  let paddingRight;

  switch (props.extensionIcon) {
    case 'file-word': paddingLeft = 20; break;
    case 'file-csv' : paddingLeft = 24; break;
    default         : paddingLeft = 20; break;
  }

  switch (props.extensionIcon) {
    case 'file-word': paddingRight = 0; break;
    case 'file-csv' : paddingRight = 5; break;
    default         : paddingRight = 0; break;
  }

  const backgroundColor = pressed ? theme.background_active : theme.background;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 1,
        backgroundColor: isDeletePressed ? theme.wrong : backgroundColor,
      }}
    >
      <Pressable
        onPress={props.onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 10,
        }}
      >
        <Icon
          iconName={props.extensionIcon}
          fontSize={40}
          color={isDeletePressed ? theme.background : theme.font}
          style={{
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
          }}
        />
        <Text
          style={{
            color: isDeletePressed ? theme.background : theme.font,
            fontSize: 24,
          }}
        >
          {props.name}
        </Text>
      </Pressable>
      <Pressable
        onPress={props.onDelete}
        onPressIn={() => setIsDeletePressed(true)}
        onPressOut={() => setIsDeletePressed(false)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <Icon
          iconName={'trash'}
          fontSize={40}
          color={isDeletePressed ? theme.background : theme.wrong}
        />
      </Pressable>
    </View>
  );
});
