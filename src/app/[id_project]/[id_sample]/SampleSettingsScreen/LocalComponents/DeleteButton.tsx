import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Components/Layout';

import { InputColors } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function DeleteButton() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.SampleSettingsScreen[language], []);
  const sampleSettings = useMemo(() => ProjectService.getSampleFromCache(id_sample), []);

  const [widgetName, setWidgetName] = useState<string>('');

  async function deleteProject() {
    await ProjectService.deleteSample(
      id_project,
      id_sample,
      async () => await useNavigate('PROJECT SCREEN', id_project),
      (errorMessage) => alert(errorMessage)
    );
  }

  const isNameCorrect = widgetName === sampleSettings.name;
  const inputColors: InputColors = {
    label: {
      background: theme.wrong,
      font: theme.onWrong,
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
      label={stringResources['Delete']}
      placeholder={stringResources['Type sample name perfectly to delete.']}
      value={widgetName}
      onChangeText={setWidgetName}
      locked={false}
      onResetPress={() => setWidgetName('')}
    />
    {isNameCorrect && (
      <Layout.Button.Text
        title={stringResources['Delete']}
        color_background={theme.wrong}
        color_font={theme.onWrong}
        onPress={async () => await deleteProject()}
      />
    )}
  </>);
}
