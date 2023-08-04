import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';
import { Input } from '@Components/Inputs';

import { translations } from '@Translations/index';

import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import ThemeService from '@Services/ThemeService';

import API_SampleCreation from './API_SampleCreation';
import { InputColors } from '@Types/index';

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

  return (
    <Layout.View>
      <Layout.Text
        fontSize={ThemeService.FONTS.h2}
        color="onBackground"
      >
        {stringResources['Sample settings']}
      </Layout.Text>
      <Input.String
        colors={inputColors}
        label={stringResources['ID']}
        placeholder={stringResources['Only numbers, letters and "-"']}
        value={id}
        locked={false}
        onChangeText={(text) => onIDChange(text)}
        onResetPress={() => setId(ProjectService.generateUuidV4())}
      />
      <Input.String
        colors={inputColors}
        label={stringResources['Name']}
        placeholder={stringResources['Write the sample name here...']}
        value={name}
        locked={false}
        onChangeText={(text) => onNameChange(text)}
        onResetPress={() => setName('')}
      />
    </Layout.View>
  );
}
