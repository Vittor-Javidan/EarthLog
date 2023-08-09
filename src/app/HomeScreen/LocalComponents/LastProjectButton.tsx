import React, { useMemo } from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

export default function LastProjectButton() {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);

  const { id_project } = ProjectService?.lastOpenProject;
  const showLastProjectButton = id_project !== '';

  return showLastProjectButton ? (
    <Layout.UI.Project
      title_label={stringResources['Recently']}
      title_button={ProjectService.lastOpenProject.name}
      onPress_Open={async () => await useNavigate('PROJECT SCREEN', id_project)}
    />
  ) : (
    <></>
  );
}
