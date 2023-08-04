import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';
import { useNavigate } from '@Hooks/index';

import { InputColors } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function DeleteButton() {

  const id_project = useLocalSearchParams().id_project as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.ProjectSettingsScreen[ConfigService.config.language], []);
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
    <Input.String
      colors={inputColors}
      label={stringResources['Delete']}
      placeholder={stringResources['Type project name perfectly to delete.']}
      value={widgetName}
      onChangeText={setWidgetName}
      locked={false}
      onResetPress={() => setWidgetName('')}
    />
    {isNameCorrect && (
      <Layout.Button
        title={stringResources['Delete']}
        overrideBackgroundColor={theme.wrong}
        overrideTextColor={theme.onWrong}
        onPress={async () => await deleteProject()}
      />
    )}
  </>);
}
