import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO, Loading } from '@Types/AppTypes';
import { ProjectDTO } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import DateTimeService from '@Services/DateTimeService';
import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';
import SyncService from '@Services/SyncService';
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

  const config     = useMemo(() => ConfigService.config, []);
  const controller = useMemo(() => new AbortController(), []);
  const [error   , setError  ] = useState<string | null>(null);
  const [loading , setLoading] = useState<Loading>('Loaded');

  const showCredentialsDisplay = error === null && loading === 'Loaded';
  const showErrorDisplay       = error !== null && loading === 'Loaded';
  const showLoadingDisplay     = loading === 'Loading';

  const onCancel = useCallback(() => {
    props.closeModal();
    controller.abort();
  }, [props.closeModal]);

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
      dateUTM: DateTimeService.getCurrentDateTimeUTC(),
      date:    DateTimeService.getCurrentDateTime(config),
      url:     credential.rootURL,
    });

    return projectDTO;

  }, []);

  const dataProcessingAfterUpload = useCallback(async (projectDTO: ProjectDTO) => {

    const { rules, id_project } = projectDTO.projectSettings;

    // Project deletion rule ==============
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

    SyncService.updateSyncDataAfterUpload(id_project);
    setLoading('Loaded');

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
