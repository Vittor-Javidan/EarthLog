import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';
import { useNavigate } from 'app/GlobalHooks';

import { InputColors } from '@Types/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function DeleteButton() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
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
    <Input.String
      colors={inputColors}
      label="Delete"
      placeholder="Type project name perfectly to delete."
      value={widgetName}
      onChangeText={setWidgetName}
      locked={false}
      onResetPress={() => setWidgetName('')}
    />
    {isNameCorrect && (
      <Layout.Button
        title="confirm to delete"
        overrideBackgroundColor={theme.wrong}
        overrideTextColor={theme.onWrong}
        onPress={async () => await deleteProject()}
      />
    )}
  </>);
}
