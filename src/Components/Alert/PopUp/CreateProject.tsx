import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Button } from '@Button/index';
import { Input } from '@Input/index';

type Vibration = 'warning' | 'success'

export default function CreateProject(props: {
  onAccept: () => void
  onRefuse: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    vibrate('success');
  }, []);

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
          vibrate('success');
        },
        async (errorMesage) => {
          alert(errorMesage);
          vibrate('warning');
        }
      );
    }
  }

  function onRefuse() {
    props.onRefuse();
    vibrate('success');
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: theme.primary,
        borderRadius: 10,
        paddingVertical: 10,
        gap: 30,
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
            font: theme.onPrimary,
            font_placeholder: theme.onPrimary_Placeholder,
            background: theme.primary,
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
          onPress={async () => onRefuse()}
          theme={{
            font: theme.wrong,
            font_Pressed: theme.tertiary,
            background: theme.tertiary,
            background_Pressed: theme.wrong,
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
            font: theme.tertiary,
            font_Pressed: theme.confirm,
            background: theme.confirm,
            background_Pressed: theme.tertiary,
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

function vibrate(type: Vibration) {
  switch (type) {
    case 'warning': Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning); break;
    case 'success': Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success); break;
  }
}
