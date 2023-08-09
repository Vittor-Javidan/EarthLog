import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';

import { InputColors } from '@Types/index';
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

  const [immutable, setImmutable] = useState<boolean>(API_TemporaryProject.project.projectSettings.immutable);
  const [id, setId] = useState<string>(API_TemporaryProject.project.projectSettings.id_project);
  const [name, setName] = useState<string>(API_TemporaryProject.project.projectSettings.name);

  function onIDChange(newID: string) {
    if (API_TemporaryProject.project.projectSettings.rules.allowIDChange) {
      const normalizedText = newID.replace(UtilService.idRegex, '');
      API_Inputs_ProjectSettings.setProjectID(normalizedText);
      setId(normalizedText);
    }
  }

  function onRefreshID() {
    if (API_TemporaryProject.project.projectSettings.rules.allowIDChange) {
      const newID = ProjectService.generateUuidV4();
      API_Inputs_ProjectSettings.setProjectID(newID);
      setId(newID);
    }
  }

  function onImmutableChange(boolean: boolean) {
    if (API_TemporaryProject.project.projectSettings.rules.allowImmutableChange) {
      API_Inputs_ProjectSettings.setProjectImmutable(boolean);
      setImmutable(boolean);
    }
  }

  function onNameChange(newName: string) {
    if (API_TemporaryProject.project.projectSettings.rules.allowNameChange) {
      API_Inputs_ProjectSettings.setProjectName(newName);
      setName(newName);
    }
  }

  function onNameReset() {
    if (API_TemporaryProject.project.projectSettings.rules.allowNameChange) {
      API_Inputs_ProjectSettings.setProjectName('');
      setName('');
    }
  }

  const inputColors: InputColors = {
    label: {
      background: theme.secondary,
      font: theme.onSecondary,
    },
    dataDisplay: {
      background: theme.tertiary,
      font: theme.onTertiary,
      font_placeholder: theme.onTertiary_Placeholder,
    },
  };

  return (<>
    <Layout.Input.String
      colors={inputColors}
      label={stringResources['ID']}
      placeholder={stringResources['Only numbers, letters and "-".']}
      value={id}
      locked={false}
      onChangeText={(text) => onIDChange(text)}
      onResetPress={() => onRefreshID()}
    />
    <Layout.Input.String
      colors={inputColors}
      label={stringResources['Name']}
      placeholder={stringResources['Write the project name here...']}
      value={name}
      locked={false}
      onChangeText={(text) => onNameChange(text)}
      onResetPress={() => onNameReset()}
    />
    <Layout.Input.Boolean
      colors={inputColors}
      label={stringResources['Immutable']}
      value={immutable}
      locked={false}
      onSwitchChange={(boolean) => onImmutableChange(boolean)}
    />
  </>);
}
