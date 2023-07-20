import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';
import { Input } from '@Components/Inputs';

import { translations } from '@Translations/index';
import { Translations_ProjectCreationScreen } from '@Translations/Screens/ProjectCreationScreen';

import ConfigService from '@Services/ConfigService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import { Languages } from '@Services/LanguageService';
import ProjectService from '@Services/ProjectService';

import API_ProjectCreation from './API_ProjectCreation';

export default function Inputs_ProjectSettings() {

  const idRegex = useMemo<RegExp>(() => /[^a-zA-Z0-9-]/g, []);
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_ProjectCreationScreen[Languages]>(() => {
    return translations.Screens.ProjectCreationScreen[ConfigService.config.language];
  }, []);

  const [immutable, setImmutable] = useState<boolean>(API_ProjectCreation.temporaryProject.projectSettings.immutable);
  const [id, setId] = useState<string>(API_ProjectCreation.temporaryProject.projectSettings.id_project);
  const [name, setName] = useState<string>(API_ProjectCreation.temporaryProject.projectSettings.name);

  function onIDChange(newID: string) {
    if (API_ProjectCreation.temporaryProject.projectSettings.rules.allowIDChange) {
      const normalizedText = newID.replace(idRegex, '');
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

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Project settings']}
      </Layout.Text>
      <Input.Boolean
        label={stringResources['Immutable']}
        backgroundColor_Label={theme.secondary}
        backgroundColor_Value={theme.tertiary}
        color_Label={theme.onSecondary}
        color_Value={theme.onTertiary}
        value={immutable}
        onSwitchChange={(boolean) => onImmutableChange(boolean)}
      />
      <Input.String
        label={stringResources['ID']}
        backgroundColor_Label={theme.secondary}
        backgroundColor_Value={theme.tertiary}
        color_Label={theme.onSecondary}
        color_Value={theme.onTertiary}
        color_Placeholder={theme.onTertiary_Placeholder}
        placeholder=""
        value={id}
        onChangeText={(text) => onIDChange(text)}
        onResetPress={() => setId(ProjectService.generateUuidV4())}
      />
      <Input.String
        label={stringResources['Name']}
        backgroundColor_Label={theme.secondary}
        backgroundColor_Value={theme.tertiary}
        color_Label={theme.onSecondary}
        color_Value={theme.onTertiary}
        color_Placeholder={theme.onTertiary_Placeholder}
        placeholder={stringResources['Write the project name here...']}
        value={name}
        onChangeText={(text) => onNameChange(text)}
        onResetPress={() => setName('')}
      />
    </Layout.View>
  );
}
