import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO, Loading } from '@Types/AppTypes';
import { ProjectDTO } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
import UtilService from '@Services/UtilService';
import CacheService from '@Services/CacheService';
import AppAPI from '@appAPI/index';

import { LC } from '@Alert/__LC__';
import { CredentialsDisplay } from './CredentialsDisplay';
import { ErrorDisplay } from './ErrorDisplay';
import { LoadingDisplay } from './LoadingDisplay';
import { FooterButtons } from './FooterButtons';

export const UploadProjects = memo((props: {
  id_project: string
  closeModal: () => void
}) => {

  const controller = useMemo(() => new AbortController(), []);
  const [error   , setError  ] = useState<string | null>(null);
  const [loading , setLoading] = useState<Loading>('Loaded');

  const showCredentialsDisplay = error === null && loading === 'Loaded';
  const showErrorDisplay       = error !== null && loading === 'Loaded';
  const showLoadingDisplay     = loading === 'Loading';

  const onCredentialChoose = useCallback(async (credential: CredentialDTO) => {
    setLoading('Loading');
    const project = await ProjectService.buildProjectFromDatabase(props.id_project);
    await uploadProject(credential, project);
  }, [props.id_project]);

  const uploadProject = useCallback(async (credential: CredentialDTO, projectDTO: ProjectDTO) => {
    const processedProject = dataProcessingBeforeUpload(credential, projectDTO);
    await new AppAPI(credential).uploadProject(controller.signal, processedProject,
      async () => {
        await dataProcessingAfterUpload(processedProject);
        await AlertService.runAcceptCallback();
        props.closeModal();
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading('Loaded');
      }
    );
  }, []);

  const dataProcessingBeforeUpload = useCallback((credential: CredentialDTO, projectDTO: ProjectDTO) => {

    // Upload Date/Time entry ================
    projectDTO.projectSettings.uploads ??= [];
    projectDTO.projectSettings.uploads.push({
      date: UtilService.getCurrentDateTime(),
      url: credential.rootURL,
    });

    // First upload status ===================
    if (!projectDTO.projectSettings.status) {
      projectDTO.projectSettings.status = 'first upload';
    }

    return projectDTO;
  }, []);

  const dataProcessingAfterUpload = useCallback(async (projectDTO: ProjectDTO) => {

    const { projectSettings } = projectDTO;
    const { rules, id_project } = projectSettings;

    if (rules.deleteAfterUpload === true) {
      await ProjectService.deleteProject(id_project,
        async () => {
          if (CacheService.lastOpenProject.id_project === id_project) {
            await CacheService.deleteLastOpenProject();
          }
          navigate('HOME SCOPE');
        },
        (errorMessage) => {
          setError(errorMessage);
          setLoading('Loaded');
        }
      );
      return;
    }

    projectSettings.status = 'uploaded';
    await ProjectService.updateProject(projectSettings,
      () => CacheService.updateCache_ProjectSettings(projectSettings),
      (errorMessage) => {
        setError(errorMessage);
        setLoading('Loaded');
      },
    );

  }, []);

  const onCancel = useCallback(() => {
    props.closeModal();
    controller.abort();
  }, [props.closeModal]);

  return (
    <LC.PopUp>
      <CredentialsDisplay
        showDisplay={showCredentialsDisplay}
        onCredentialChoose={async (credential) => await onCredentialChoose(credential)}
      />
      <ErrorDisplay
        showDisplay={showErrorDisplay}
        error={error}
      />
      <LoadingDisplay
        showDisplay={showLoadingDisplay}
      />
      <FooterButtons
        onCancel={() => onCancel()}
      />
    </LC.PopUp>
  );
});
