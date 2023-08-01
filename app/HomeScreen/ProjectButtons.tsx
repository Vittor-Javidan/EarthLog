import React from 'react';
import { Layout } from '@Layout/index';

import ThemeService from '@Services/ThemeService';
import ProjectService from '@Services/ProjectService';
import { useNavigate } from 'app/GlobalHooks';

export default function ProjectButtons() {

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
          Projects
        </Layout.Text>
        {allProjectButtons}
      </>)}
    </Layout.View>
  );
}

function LastProjectButton() {

  const { id_project } = ProjectService.lastProject;
  const showLastProjectButton = ProjectService.lastProject.id_project !== '';

  return (showLastProjectButton ? (<>
    <Layout.Text
      fontSize={ThemeService.FONTS.h2}
      color={'onBackground'}
    >
      Last Open
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
