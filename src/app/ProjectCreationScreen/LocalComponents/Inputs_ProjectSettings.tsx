import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';

import { translations } from '@Translations/index';

import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_TemporaryProject from './API_TemporaryProject';
import API_Inputs_ProjectSettings from './API_Inputs_ProjectSettings';

export default function Inputs_ProjectSettings() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  const [id, setId] = useState<string>(API_TemporaryProject.project.projectSettings.id_project);
  const [name, setName] = useState<string>(API_TemporaryProject.project.projectSettings.name);

  function onIDChange(newID: string) {
    const normalizedText = newID.replace(UtilService.idRegex, '');
    API_Inputs_ProjectSettings.setProjectID(normalizedText);
    setId(normalizedText);
  }

  function onRefreshID() {
    const newID = ProjectService.generateUuidV4();
    API_Inputs_ProjectSettings.setProjectID(newID);
    setId(newID);
  }

  function onNameChange(newName: string) {
    API_Inputs_ProjectSettings.setProjectName(newName);
    setName(newName);
  }

  function onNameReset() {
    API_Inputs_ProjectSettings.setProjectName('');
    setName('');
  }

  return (
    <Layout.View>
      <Layout.View
        style={{
          backgroundColor: theme.secondary,
          height: 40,
          padding: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Layout.Icon
          color={theme.onTertiary}
          iconName="settings"
        />
      </Layout.View>
      <Layout.View
        style={{
          backgroundColor: theme.tertiary,
          padding: 5,
          paddingBottom: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          gap: 10,
        }}
      >
        <Layout.Input.String
          label={stringResources['ID']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={stringResources['Only numbers, letters and "-".']}
          value={id}
          onChangeText={(text) => onIDChange(text)}
          onResetPress={() => onRefreshID()}
          locked={false}
        />
        <Layout.Input.String
          label={stringResources['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={stringResources['Write the project name here...']}
          value={name}
          onChangeText={(text) => onNameChange(text)}
          onResetPress={() => onNameReset()}
          locked={false}
        />
      </Layout.View>
    </Layout.View>
  );
}
