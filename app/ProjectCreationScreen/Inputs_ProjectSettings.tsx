import ConfigService from '@Services/ConfigService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import React, { useState, useMemo } from 'react';
import { ProjectCreationScreenTranslations, languages } from './translations';
import { Languages } from '@Services/LanguageService';
import API_ProjectCreation from './API_ProjectCreation';
import { Layout } from '@Components/Layout';
import { Input } from '@Components/Inputs';
import ProjectService from '@Services/ProjectService';

export default function Inputs_ProjectSettings() {

  const idRegex = useMemo<RegExp>(() => /[^a-zA-Z0-9-]/g, []);
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<ProjectCreationScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);

  const [immutable, setImmutable] = useState<boolean>(API_ProjectCreation.temporaryProject.projectSettings.Immutable);
  const [id, setId] = useState<string>(API_ProjectCreation.temporaryProject.projectSettings.ID);
  const [name, setName] = useState<string>(API_ProjectCreation.temporaryProject.projectSettings.Name);

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
      API_ProjectCreation.temporaryProject.projectSettings.Name = newName;
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
