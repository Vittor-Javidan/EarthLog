import React, { useState, useMemo } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';
import { useTiming } from 'app/GlobalHooks';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
import ProjectService from '@Services/ProjectService';

export default function Inputs_ProjectSettings() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);
  const { rules } = useMemo(() => projectSettings, []);

  const [name, setName] = useState<string>(projectSettings.name);
  const [immutable, setImmutable] = useState<boolean>(projectSettings.immutable);
  const [saved, setSaved] = useState<boolean>(true);

  useTiming(async () => {
    if (!saved) {
      projectSettings.name = name;
      projectSettings.immutable = immutable;
      await ProjectService.updateProject(
        projectSettings,
        () => setSaved(true),
        (erroMessage) => alert(erroMessage)
      );
    }
  }, [saved], 100);

  function onImmutableChange(boolean: boolean) {
    if (rules.allowImmutableChange) {
      setImmutable(boolean);
      setSaved(false);
    }
  }

  function onNameChange(newName: string) {
    if (rules.allowNameChange) {
      setName(newName);
      setSaved(false);
    }
  }

  function onNameReset() {
    if (rules.allowNameChange) {
      setName(projectSettings.name);
      setSaved(false);
    }
  }

  return (<>
    <StatusFeedback saved={saved} />
    <Display_ID />
    {rules.allowNameChange ? <Input.String
      label="Name"
      backgroundColor_Label={theme.secondary}
      backgroundColor_Value={theme.tertiary}
      color_Label={theme.onSecondary}
      color_Value={theme.onTertiary}
      color_Placeholder={theme.onTertiary_Placeholder}
      placeholder=""
      value={name}
      onChangeText={(text) => onNameChange(text)}
      onResetPress={() => onNameReset()}
    /> : <Display_Name />}
    {rules.allowImmutableChange ? <Input.Boolean
      label="Immutable"
      backgroundColor_Label={theme.secondary}
      backgroundColor_Value={theme.tertiary}
      color_Label={theme.onSecondary}
      color_Value={theme.onTertiary}
      value={immutable}
      onSwitchChange={(boolean) => onImmutableChange(boolean)}
    /> : <Display_Immutable />}
  </>);
}

function StatusFeedback(props: { saved: boolean }) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  return (
    <Layout.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.background,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onBackground,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        Status
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: props.saved ? theme.confirm : theme.modified,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        {props.saved ? 'Saved' : 'Saving'}
      </Text>
    </Layout.View>
  );
}

function Display_ID() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  return (
    <Layout.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.secondary,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        ID
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        {projectSettings.id_project}
      </Text>
    </Layout.View>
  );
}

function Display_Name() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  return (
    <Layout.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.secondary,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        Name
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        {projectSettings.name}
      </Text>
    </Layout.View>
  );
}

function Display_Immutable() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  return (
    <Layout.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: theme.secondary,
      }}
    >
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        Immutable
      </Text>
      <Text
        adjustsFontSizeToFit={true}
        style={{
          color: theme.onSecondary,
          fontSize: ThemeService.FONTS.h3,
          paddingHorizontal: 10,
        }}
      >
        {JSON.stringify(projectSettings.immutable)}
      </Text>
    </Layout.View>
  );
}
