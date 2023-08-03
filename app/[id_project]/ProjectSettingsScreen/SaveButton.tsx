import React, { useMemo } from 'react';
import { Layout } from '@Components/Layout';
import { useNavigate } from 'app/GlobalHooks';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import API_ProjectEdit from './API_ProjectEdit';

export default function SaveButton() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  async function saveAndExit() {
    await ProjectService.updateProject(
      API_ProjectEdit.projectSettings,
      async () => await useNavigate('PROJECT SCREEN', API_ProjectEdit.initialValues.id_project),
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Layout.Button
      title="Save"
      overrideBackgroundColor={theme.confirm}
      overrideTextColor={theme.onConfirm}
      onPress={async () => await saveAndExit()}
    />
  );
}
