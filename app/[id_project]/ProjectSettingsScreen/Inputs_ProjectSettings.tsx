import React, { useState, useMemo } from 'react';
import { Text } from 'react-native';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';

import ConfigService from '@Services/ConfigService';
import API_ProjectEdit from './API_ProjectEdit';
import ThemeService from '@Services/ThemeService';

export default function Inputs_ProjectSettings() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const { rules } = useMemo(() => API_ProjectEdit.projectSettings, []);

  const [immutable, setImmutable] = useState<boolean>(API_ProjectEdit.projectSettings.immutable);
  const [name, setName] = useState<string>(API_ProjectEdit.projectSettings.name);

  function onImmutableChange(boolean: boolean) {
    if (API_ProjectEdit.projectSettings.rules.allowImmutableChange) {
      API_ProjectEdit.setImmutable(boolean);
      setImmutable(boolean);
    }
  }

  function onNameChange(newName: string) {
    if (API_ProjectEdit.projectSettings.rules.allowNameChange) {
      API_ProjectEdit.setName(newName);
      setName(newName);
    }
  }

  function onNameReset() {
    if (API_ProjectEdit.projectSettings.rules.allowNameChange) {
      API_ProjectEdit.setName(API_ProjectEdit.initialValues.name);
      setName(API_ProjectEdit.initialValues.name);
    }
  }

  return (<>
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

function Display_ID() {

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
        {API_ProjectEdit.projectSettings.id_project}
      </Text>
    </Layout.View>
  );
}

function Display_Name() {

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
        {API_ProjectEdit.projectSettings.name}
      </Text>
    </Layout.View>
  );
}

function Display_Immutable() {

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
        {JSON.stringify(API_ProjectEdit.projectSettings.immutable)}
      </Text>
    </Layout.View>
  );
}
