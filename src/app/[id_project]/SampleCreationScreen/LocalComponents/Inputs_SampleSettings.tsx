import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';

import { translations } from '@Translations/index';

import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_Inputs_SampleSettings from './API_Inputs_SampleSettings';
import { InputColors } from '@Types/index';

export default function Inputs_SampleSettings() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleCreationScreen[language], []);

  const [id, setId] = useState<string>(API_Inputs_SampleSettings.temporarySettings.id_sample);
  const [name, setName] = useState<string>(API_Inputs_SampleSettings.temporarySettings.name);

  function onIDChange(newID: string) {
    if (API_Inputs_SampleSettings.temporarySettings.rules.allowIDChange) {
      const normalizedText = newID.replace(UtilService.idRegex, '');
      API_Inputs_SampleSettings.setSampleID(normalizedText);
      setId(normalizedText);
    }
  }

  function onNameChange(newName: string) {
    if (API_Inputs_SampleSettings.temporarySettings.rules.allowNameChange) {
      API_Inputs_SampleSettings.setSampleName(newName);
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
      <Layout.Input.String
        colors={inputColors}
        label={stringResources['ID']}
        placeholder={stringResources['Only numbers, letters and "-"']}
        value={id}
        locked={false}
        onChangeText={(text) => onIDChange(text)}
        onResetPress={() => setId(ProjectService.generateUuidV4())}
      />
      <Layout.Input.String
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
