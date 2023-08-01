import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';
import { Input } from '@Components/Inputs';

import { translations } from '@Translations/index';

import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import ThemeService from '@Services/ThemeService';

import API_SampleCreation from './API_SampleCreation';

export default function Inputs_SampleSettings() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleCreationScreen[language], []);

  const [id, setId] = useState<string>(API_SampleCreation.temporarySettings.id_sample);
  const [name, setName] = useState<string>(API_SampleCreation.temporarySettings.name);

  function onIDChange(newID: string) {
    if (API_SampleCreation.temporarySettings.rules.allowIDChange) {
      const normalizedText = newID.replace(UtilService.idRegex, '');
      API_SampleCreation.setSampleID(normalizedText);
      setId(normalizedText);
    }
  }

  function onNameChange(newName: string) {
    if (API_SampleCreation.temporarySettings.rules.allowNameChange) {
      API_SampleCreation.setSampleName(newName);
      setName(newName);
    }
  }

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Sample settings']}
      </Layout.Text>
      <Input.String
        label={stringResources['ID']}
        backgroundColor_Label={theme.secondary}
        backgroundColor_Value={theme.tertiary}
        color_Label={theme.onSecondary}
        color_Value={theme.onTertiary}
        color_Placeholder={theme.onTertiary_Placeholder}
        placeholder={stringResources['Only numbers, letters and "-"']}
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
        placeholder={stringResources['Write the sample name here...']}
        value={name}
        onChangeText={(text) => onNameChange(text)}
        onResetPress={() => setName('')}
      />
    </Layout.View>
  );
}
