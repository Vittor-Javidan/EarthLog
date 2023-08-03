import React, { useState, useMemo } from 'react';
import ConfigService from '@Services/ConfigService';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';
import API_ProjectEdit from './API_ProjectEdit';
import ProjectService from '@Services/ProjectService';
import { useNavigate } from 'app/GlobalHooks';

export default function DeleteButton() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);
  const { initialValues } = useMemo(() => API_ProjectEdit, []);

  const [widgetName, setWidgetName] = useState<string>('');

  async function deleteProject() {
    await ProjectService.deleteProject(
      initialValues.id_project,
      async () => await useNavigate('HOME SCREEN'),
      (errorMessage) => alert(errorMessage)
    );
  }

  const isNameCorrect = widgetName === API_ProjectEdit.initialValues.name;

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
