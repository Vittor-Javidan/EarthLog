import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO, Loading } from '@Types/AppTypes';
import { DownloadedProjectDTO } from '@Types/ProjectTypes';
import AppAPI from '@appAPI/index';

import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';
import SyncService from '@Services/SyncService';

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
  const [allProjects     , setAllProjects        ] = useState<DownloadedProjectDTO[] | null>(null);
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

      // TODO: Check data integrity here before data processing. If invalid, continue to next loop.

      const processedProject = dataProcessingAfterConfirm(allSelectedProjects[i]);
      await ProjectService.createProject(processedProject,
        () => {
          CacheService.addToAllProjects(processedProject.projectSettings);
          SyncService.addToSyncData(processedProject.syncData);
        },
        (errorMessage) => {
          setError(errorMessage);
          setLoading('Loaded');
        },
      );
    }

    await AlertService.runAcceptCallback();
    props.closeModal();

  }, [props.closeModal, allProjects, selectedProjects]);

  const dataProcessingAfterConfirm = useCallback((projectDTO: DownloadedProjectDTO) => {

    const { rules } = projectDTO.projectSettings;

    if (rules.allowMultipleDownloads) {
      ProjectService.changeAllIDs(projectDTO);
      projectDTO.projectSettings.status = 'new';
      delete rules.allowMultipleDownloads;
    }

    if (projectDTO.projectSettings.status !== 'uploaded') {
      projectDTO.projectSettings.status = 'new';
    }

    return SyncService.createSyncDataAfterDownload(projectDTO);

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
