import React, { useMemo } from 'react';
import { Layout } from '@Layout/index';
import { useNavigate } from 'app/GlobalHooks';

import { translations } from '@Translations/index';

import ThemeService from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';


export default function ProjectButtons() {

  const stringResources = useMemo(
    () => translations.Screens.HomeScreen[ConfigService.config.language], []
  );

  const allProjectButtons = ProjectService.allProjects.map(settings => (
    <Layout.Button
      key={settings.id_project}
      title={settings.name}
      onPress={async () => {
        await ProjectService.saveLastOpenProject(settings.id_project);
        await ProjectService.loadAllSamplesSettings(settings.id_project);
        useNavigate('PROJECT SCREEN', settings.id_project);
      }}
    />
  ));

  const showProjects = (
    (
      ProjectService.allProjects.length > 0 &&
      ProjectService.lastProject.id_project === ''
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

  const { id_project } = ProjectService.lastProject;
  const showLastProjectButton = ProjectService.lastProject.id_project !== '';

  return (showLastProjectButton ? (<>
    <Layout.Text
      fontSize={ThemeService.FONTS.h2}
      color={'onBackground'}
    >
      {stringResources['Last Open']}
    </Layout.Text>
    <Layout.Button
      title={ProjectService.lastProject.name}
      onPress={async () => {
        await ProjectService.loadAllSamplesSettings(id_project);
        useNavigate('PROJECT SCREEN', id_project);
      }}
    />
  </>) : <></>);
}