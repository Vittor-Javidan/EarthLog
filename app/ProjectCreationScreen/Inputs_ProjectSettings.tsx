import React, { useState, useMemo } from 'react';
import { Input } from '@Components/Inputs';

import { InputColors } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_ProjectCreation from './API_ProjectCreation';
import UtilService from '@Services/UtilService';

export default function Inputs_ProjectSettings() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectCreationScreen[language], []);

  const [immutable, setImmutable] = useState<boolean>(API_ProjectCreation.temporaryProject.projectSettings.immutable);
  const [id, setId] = useState<string>(API_ProjectCreation.temporaryProject.projectSettings.id_project);
  const [name, setName] = useState<string>(API_ProjectCreation.temporaryProject.projectSettings.name);

  function onIDChange(newID: string) {
    if (API_ProjectCreation.temporaryProject.projectSettings.rules.allowIDChange) {
      const normalizedText = newID.replace(UtilService.idRegex, '');
      API_ProjectCreation.setProjectID(normalizedText);
      setId(normalizedText);
    }
  }

  function onImmutableChange(boolean: boolean) {
    if (API_ProjectCreation.temporaryProject.projectSettings.rules.allowImmutableChange) {
      API_ProjectCreation.setProjectImmutable(boolean);
      setImmutable(boolean);
    }
  }

  function onNameChange(newName: string) {
    if (API_ProjectCreation.temporaryProject.projectSettings.rules.allowNameChange) {
      API_ProjectCreation.temporaryProject.projectSettings.name = newName;
      setName(newName);
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
    <Input.String
      colors={inputColors}
      label={stringResources['ID']}
      placeholder={stringResources['Only numbers, letters and "-".']}
      value={id}
      locked={false}
      onChangeText={(text) => onIDChange(text)}
      onResetPress={() => setId(ProjectService.generateUuidV4())}
    />
    <Input.String
      colors={inputColors}
      label={stringResources['Name']}
      placeholder={stringResources['Write the project name here...']}
      value={name}
      locked={false}
      onChangeText={(text) => onNameChange(text)}
      onResetPress={() => setName('')}
    />
    <Input.Boolean
      colors={inputColors}
      label={stringResources['Immutable']}
      value={immutable}
      locked={false}
      onSwitchChange={(boolean) => onImmutableChange(boolean)}
    />
  </>);
}
