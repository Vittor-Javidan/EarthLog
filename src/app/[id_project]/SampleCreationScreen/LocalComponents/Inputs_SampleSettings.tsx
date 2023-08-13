import React, { useState, useMemo } from 'react';
import { Layout } from '@Components/Layout';

import { translations } from '@Translations/index';

import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_Inputs_SampleSettings from './API_Inputs_SampleSettings';

export default function Inputs_SampleSettings() {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Screens.SampleCreationScreen[language], []);

  const [id, setId] = useState<string>(API_Inputs_SampleSettings.temporarySettings.id_sample);
  const [name, setName] = useState<string>(API_Inputs_SampleSettings.temporarySettings.name);

  function onIDChange(newID: string) {
    const normalizedText = newID.replace(UtilService.idRegex, '');
    API_Inputs_SampleSettings.setSampleID(normalizedText);
    setId(normalizedText);
  }

  function onNameChange(newName: string) {
    API_Inputs_SampleSettings.setSampleName(newName);
    setName(newName);
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
          placeholder={stringResources['Only numbers, letters and "-"']}
          value={id}
          onChangeText={(text) => onIDChange(text)}
          onResetPress={() => setId(ProjectService.generateUuidV4())}
          locked={false}
        />
        <Layout.Input.String
          label={stringResources['Name']}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={stringResources['Write the sample name here...']}
          value={name}
          onChangeText={(text) => onNameChange(text)}
          onResetPress={() => setName('')}
          locked={false}
        />
      </Layout.View>
    </Layout.View>
  );
}
