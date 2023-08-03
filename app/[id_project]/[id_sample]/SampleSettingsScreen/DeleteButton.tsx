import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';
import { useNavigate } from 'app/GlobalHooks';

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

  return (<>
    <Input.String
      label="Delete"
      placeholder="Type project name perfectly to delete."
      backgroundColor_Label={theme.wrong}
      backgroundColor_Value={theme.tertiary}
      color_Label={theme.onWrong}
      color_Value={theme.onTertiary}
      color_Placeholder={theme.onTertiary_Placeholder}
      value={widgetName}
      onChangeText={setWidgetName}
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
