import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO, Loading } from '@Types/AppTypes';
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
import { ProjectDTO } from '@Types/ProjectTypes';

export const UploadProjects = memo((props: {
  id_project: string | undefined
  closeModal: () => void
}) => {

  const controller = useMemo(() => new AbortController(), []);
  const [error   , setError  ] = useState<string | null>(null);
  const [loading , setLoading] = useState<Loading>('Loaded');

  const showCredentialsDisplay = error === null && loading === 'Loaded';
  const showErrorDisplay       = error !== null && loading === 'Loaded';
  const showLoadingDisplay     = loading === 'Loading';

  const onCancel = useCallback(() => {
    props.closeModal();
    controller.abort();
  }, [props.closeModal, controller]);

  const onCredentialChoose = useCallback(async (credential: CredentialDTO) => {

    setLoading('Loading');

    const { id_project } = props;
    if (id_project === undefined) {
      setError('Project ID undefined');
      setLoading('Loaded');
      return;
    }

    const projectDTO = await ProjectService.buildProjectFromDatabase(id_project);
    const appAPI = new AppAPI(credential);
    addUploadTimeEntry(projectDTO, credential.rootURL);

    await appAPI.uploadProject(controller.signal, projectDTO,
      async () => {
        projectDTO.projectSettings.status = 'uploaded';
        await ProjectService.updateProject(projectDTO.projectSettings,
          () => CacheService.updateCache_ProjectSettings(projectDTO.projectSettings),
          (errorMessage) => alert(errorMessage),
        );
        await AlertService.runAcceptCallback();
        props.closeModal();
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading('Loaded');
      }
    );

  }, []);

  const addUploadTimeEntry = useCallback((projectDTO: ProjectDTO, apiUrl: string) => {
    if (!projectDTO.projectSettings.uploads) {
      projectDTO.projectSettings.uploads = [];
    }
    projectDTO.projectSettings.uploads.push({
      date: UtilService.getCurrentDateTime(),
      url: apiUrl,
    });
  }, []);

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
