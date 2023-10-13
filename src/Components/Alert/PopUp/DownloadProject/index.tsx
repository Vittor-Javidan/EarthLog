import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO, Loading } from '@Types/AppTypes';
import { ProjectDTO } from '@Types/ProjectTypes';
import AppAPI from '@appAPI/index';

import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';

import { LC } from '@Alert/__LC__';
import { CredentialsDisplay } from './CredentialsDisplay';
import { ErrorDisplay } from './ErrorDisplay';
import { ProjectsDisplay } from './ProjectsDisplay';
import { LoadingDisplay } from './LoadingDisplay';
import { FooterButtons } from './FooterButtons';

export const DownloadProjects = memo((props: {
  closeModal: () => void
}) => {

  const controller = useMemo(() => new AbortController(), []);
  const [allProjects     , setAllProjects        ] = useState<ProjectDTO[] | null>(null);
  const [selectedProjects, setAllSelectedProjects] = useState<Record<string, boolean>>({});
  const [hideAcceptButton, setHideConfirmButton  ] = useState<boolean>(false);
  const [error           , setError              ] = useState<string | null>(null);
  const [loading         , setLoading            ] = useState<Loading>('Loaded');

  const showCredendialDisplay =
    loading     === 'Loaded'  &&
    allProjects === null      &&
    error       === null
  ;
  const showProjectsDownloadedDisplay =
    loading     === 'Loaded'  &&
    allProjects !== null      &&
    error       === null
  ;
  const showErrorDisplay =
    loading     === 'Loaded'  &&
    error       !== null
  ;
  const showLoadingDisplay =
    loading     === 'Loading'
  ;
  const showConfirmButtons =
    showProjectsDownloadedDisplay             &&
    Object.keys(selectedProjects).length > 0  &&
    !hideAcceptButton
  ;



  const onCancel = useCallback(() => {
    props.closeModal();
    controller.abort();
  }, [props.closeModal]);



  const onCredentialChoose = useCallback(async (credential: CredentialDTO) => {
    setLoading('Loading');
    const appAPI = new AppAPI(credential);
    await appAPI.downloadProjects(controller.signal,
      (projects) => {
        setAllProjects(projects);
        setLoading('Loaded');
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading('Loaded');
      },
    );
  }, []);



  const onSelectProject = useCallback((project_id: string, selected: boolean) => {
    setAllSelectedProjects(prev => {
      const newRecord = { ...prev };
      selected === true ? newRecord[project_id] = selected : delete newRecord[project_id];
      return newRecord;
    });
  }, []);



  const onConfirm = useCallback(async () => {

    if (allProjects === null) {
      return;
    }

    setLoading('Loading');
    setHideConfirmButton(true);

    const allSelectedProjectsKeys = Object.keys(selectedProjects);
    const allSelectedProjects = allProjects.filter(projects => allSelectedProjectsKeys.includes(projects.projectSettings.id_project));

    for (let i = 0; i < allSelectedProjects.length; i++) {
      const processedProject = dataProcessingAfterConfirm(allSelectedProjects[i]);
      await ProjectService.createProject(processedProject,
        () => CacheService.addToAllProjects(processedProject.projectSettings),
        (errorMessage) => {
          setError(errorMessage);
          setLoading('Loaded');
        },
      );
    }

    await AlertService.runAcceptCallback();
    props.closeModal();

  }, [props.closeModal, allProjects, selectedProjects]);



  const dataProcessingAfterConfirm = useCallback((projectDTO: ProjectDTO) => {

    const { rules } = projectDTO.projectSettings;

    // Project Settings Treatment =====
    if (rules.allowMultipleDownloads) {
      ProjectService.changeAllIDs(projectDTO);
      projectDTO.projectSettings.status = 'new';
      delete rules.allowMultipleDownloads;
    }

    // Set project status =================================
    if (projectDTO.projectSettings.status !== 'uploaded') {
      projectDTO.projectSettings.status = 'new';
    }

    // Widgets_project status same as project ==================
    for (let i = 0; i < projectDTO.projectWidgets.length; i++) {
      projectDTO.projectWidgets[i].status = projectDTO.projectSettings.status;
    }

    // Widgets_template status same as project ===========
    for (let i = 0; i < projectDTO.template.length; i++) {
      projectDTO.template[i].status = projectDTO.projectSettings.status;
    }

    // Samples status same as project ===================
    for (let i = 0; i < projectDTO.samples.length; i++) {
      projectDTO.samples[i].sampleSettings.status = projectDTO.projectSettings.status;

      //Widgets_sample status me as project ================================
      for (let j = 0; j < projectDTO.samples[i].sampleWidgets.length; j++) {
        projectDTO.samples[i].sampleWidgets[j].status = projectDTO.projectSettings.status;
      }
    }

    return projectDTO;

  }, []);



  return (
    <LC.PopUp>
      <CredentialsDisplay
        showDisplay={showCredendialDisplay}
        onCredentialChoose={async (credential) => await onCredentialChoose(credential)}
      />
      <ErrorDisplay
        showDisplay={showErrorDisplay}
        error={error}
      />
      <ProjectsDisplay
        downloadedProjects={allProjects ?? []}
        showDisplay={showProjectsDownloadedDisplay}
        onSelect={(project_id, selected) => onSelectProject(project_id, selected)}
      />
      <LoadingDisplay
        showDisplay={showLoadingDisplay}
      />
      <FooterButtons
        showConfirmButton={showConfirmButtons}
        onCancel={() => onCancel()}
        onConfirm={async () => await onConfirm()}
      />
    </LC.PopUp>
  );
});
