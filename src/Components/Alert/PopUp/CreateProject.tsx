import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as Vibration from 'expo-haptics';

import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import { Button } from '@Components/Layout/Button';
import ProjectService from '@Services/ProjectService';
import { Input } from '@Components/Layout/Input';
import CacheService from '@Services/CacheService';

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
          placeholder="Write project's name here"
          inline={true}
          locked={false}
          color={theme.onPrimary}
          color_placeholder={theme.onPrimary_Placeholder}
          backgroundColor={theme.primary}
          value={name}
          onChangeText={(text) => setName(text)}
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
          color_background={theme.secondary}
          color={theme.wrong}
          color_onPressed={theme.tertiary}
          onPress={async () => onRefuse()}
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
          color_background={theme.confirm}
          color={theme.onConfirm}
          color_onPressed={theme.tertiary}
          onPress={async () => await onAccept()}
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
