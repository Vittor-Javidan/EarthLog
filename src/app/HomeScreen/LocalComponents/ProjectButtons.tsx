import React from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';
import ProjectService from '@Services/ProjectService';

export default function ProjectButtons() {

  const { id_project: lastOpen_id_project } = ProjectService?.lastOpenProject;
  const allProjectButtons = ProjectService.allProjects.map(settings => {
    if (settings.id_project !== lastOpen_id_project) {
      return <Layout.UI.Project
        key={settings.id_project}
        title_label=""
        title_button={settings.name}
        onPress_Open={async () => await useNavigate('PROJECT SCREEN', settings.id_project)}
      />;
    }
  });

  const projectsAvailable = ProjectService.allProjects.length > 0;
  const noLastOpenProject = ProjectService.lastOpenProject.id_project === '';
  const multipleProjects = ProjectService.allProjects.length > 1;
  const showProjects = (projectsAvailable && noLastOpenProject) || multipleProjects;

  return (<>
    {showProjects && (<>
      {allProjectButtons}
    </>)}
  </>);
}
