import React, { useMemo } from 'react';
import { useNavigate } from '@Hooks/index';
import { Layout } from '@Layout/index';

import ConfigService from '@Services/ConfigService';
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

  const noProjectsAvailable = ProjectService.allProjects.length <= 0;
  const projectsAvailable = ProjectService.allProjects.length > 0;
  const noLastOpenProject = ProjectService.lastOpenProject.id_project === '';
  const multipleProjects = ProjectService.allProjects.length > 1;
  const showProjects = (projectsAvailable && noLastOpenProject) || multipleProjects;

  return (<>
    {noProjectsAvailable && (
      <NoProjectMessage />
    )}
    {showProjects && (<>
      {allProjectButtons}
    </>)}
  </>);
}

function NoProjectMessage() {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  return (
    <Layout.Text.MessageArea
      color_background={theme.primary}
      color_border={theme.secondary}
    >
        <Layout.Text.BR />
        <Layout.Text.H1
          style={{ color: theme.onPrimary }}
        >
          Nothing here!
        </Layout.Text.H1>
        <Layout.Text.BR />
        <Layout.Text.H2
          style={{
            color: theme.onPrimary,
          }}
        >
          Creating a new project:
        </Layout.Text.H2>
        <Layout.Text.P
          style={{ color: theme.onPrimary }}
        >
          To start to create a new project, click on the right side button on the bottom of your screen.
        </Layout.Text.P>
    </Layout.Text.MessageArea>
  );
}
