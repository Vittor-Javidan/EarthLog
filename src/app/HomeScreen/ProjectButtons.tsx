import React, { useMemo } from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';

import { translations } from '@Translations/index';

import ThemeService from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';


export default function ProjectButtons() {

  const { config } = useMemo(() => ConfigService, []);
  const { language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Screens.HomeScreen[language], []);

  const allProjectButtons = ProjectService.allProjects.map(settings => (
    <Layout.Button.Text
      key={settings.id_project}
      title={settings.name}
      onPress={async () => await useNavigate('PROJECT SCREEN', settings.id_project)}
    />
  ));

  const showProjects = (
    (
      ProjectService.allProjects.length > 0 &&
      ProjectService.lastOpenProject.id_project === ''
    ) ||
    (ProjectService.allProjects.length > 1)
  );

  return (
    <Layout.View>
      <LastProjectButton />
      {showProjects && (<>
        <Layout.Text
          fontSize={ThemeService.FONTS.h2}
          color={'onBackground'}
        >
          {stringResources['Projects']}
        </Layout.Text>
        {allProjectButtons}
      </>)}
    </Layout.View>
  );
}

function LastProjectButton() {

  const stringResources = useMemo(
    () => translations.Screens.HomeScreen[ConfigService.config.language], []
  );

  const { id_project } = ProjectService?.lastOpenProject;
  const showLastProjectButton = id_project !== '';

  return (showLastProjectButton ? (<>
    <Layout.Text
      fontSize={ThemeService.FONTS.h2}
      color={'onBackground'}
    >
      {stringResources['Last Open']}
    </Layout.Text>
    <Layout.Button.Text
      title={ProjectService.lastOpenProject.name}
      onPress={async () => await useNavigate('PROJECT SCREEN', id_project)}
    />
  </>) : <></>);
}
