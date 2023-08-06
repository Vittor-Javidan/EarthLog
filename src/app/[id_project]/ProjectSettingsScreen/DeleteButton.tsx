import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Layout } from '@Components/Layout';
import { useNavigate } from '@Hooks/index';

import { InputColors } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function DeleteButton() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[language], []);
  const projectSettings = useMemo(() => ProjectService.getProjectFromCache(id_project), []);

  const [widgetName, setWidgetName] = useState<string>('');

  async function deleteProject() {
    await ProjectService.deleteProject(
      id_project,
      async () => await useNavigate('HOME SCREEN'),
      (errorMessage) => alert(errorMessage)
    );
  }

  const isNameCorrect = widgetName === projectSettings.name;
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
      placeholder={stringResources['Type project name perfectly to delete.']}
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
