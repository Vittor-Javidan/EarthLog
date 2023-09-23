import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';
import { Input } from '@Input/index';

export default function CreateProject(props: {
  onAccept: () => void
  onRefuse: () => void
}) {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const [name, setName] = useState<string>('');

  async function onAccept() {
    if (name !== '') {
      const newProject = ProjectService.getDefaultProjectTemplate();
      newProject.projectSettings.name = name;
      await ProjectService.createProject(
        newProject,
        async () => {
          await CacheService.loadAllProjectsSettings();
          props.onAccept();
          await AlertService.runAcceptCallback();
        },
        async (errorMesage) => {
          alert(errorMesage);
          Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
        }
      );
    }
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.background,
        borderRadius: 10,
        paddingVertical: 10,
        gap: 10,
      }}
    >
      <View
        style={{
          paddingHorizontal: 5,
        }}
      >
        <Input.String
          label="Project name"
          value={name}
          onTextChange={(text) => setName(text)}
          placeholder="Write project's name here"
          multiline={false}
          theme={{
            font: theme.font,
            font_placeholder: theme.font_placeHolder,
            background: theme.background,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Button.Icon
          iconName="close"
          onPress={() => props.onRefuse()}
          theme={{
            font: theme.wrong,
            font_Pressed: theme.wrong,
            background: theme.background_Button,
            background_Pressed: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 0,
            borderRadius: 10,
          }}
        />
        <Button.Icon
          iconName={name !== '' ? 'checkmark-done-sharp' : 'lock-closed-sharp'}
          onPress={async () => await onAccept()}
          theme={{
            font: theme.font,
            font_Pressed: theme.confirm,
            background: theme.confirm,
            background_Pressed: theme.background_active,
          }}
          style={{
            height: 40,
            flex: 1,
            justifyContent: 'center',
            paddingVertical: 5,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
}
