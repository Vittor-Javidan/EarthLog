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
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import { translations } from '@Translations/index';

export const UploadProjects = memo((props: {
  id_project: string | undefined
  closeModal: () => void
}) => {

  const controller = useMemo(() => new AbortController(), []);
  const config     = useMemo(() => ConfigService.config, []);
  const R          = useMemo(() => translations.component.alert.uploadProject[config.language], []);

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
    if (props.id_project === undefined) {
      setError(R['Project ID undefined']);
      setLoading('Loaded');
      return;
    }
    await uploadProject(credential,
      await ProjectService.buildProjectFromDatabase(props.id_project)
    );
  }, []);

  const uploadProject = useCallback(async (credential: CredentialDTO, projectDTO: ProjectDTO) => {

    // UPLOAD ENTRY ==========================
    if (!projectDTO.projectSettings.uploads) {
      projectDTO.projectSettings.uploads = [];
    }
    projectDTO.projectSettings.uploads.push({
      date: UtilService.getCurrentDateTime(),
      url: credential.rootURL,
    });

    // UPLOAD STATUS ===========================
    if (!projectDTO.projectSettings.status) {
      projectDTO.projectSettings.status = 'first upload';
    }

    // UPLOAD REQUEST ======================================
    const appAPI = new AppAPI(credential);
    await appAPI.uploadProject(controller.signal, projectDTO,
      async () => {
        if (!projectDTO.projectSettings.rules.deleteAfterUpload) {
          projectDTO.projectSettings.status = 'uploaded';
          await ProjectService.updateProject(projectDTO.projectSettings,
            () => CacheService.updateCache_ProjectSettings(projectDTO.projectSettings),
            (errorMessage) => alert(errorMessage),
          );
        } else {
          await deleteProject(projectDTO);
        }
        await AlertService.runAcceptCallback();
        props.closeModal();
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading('Loaded');
      }
    );
  }, []);

  const deleteProject = useCallback(async (projectDTO: ProjectDTO) => {
    const { id_project } = projectDTO.projectSettings;
    const isLatOpenProject = CacheService.lastOpenProject.id_project === id_project;
    await ProjectService.deleteProject(
      id_project,
      async () => {
        if (isLatOpenProject) {
          await CacheService.deleteLastOpenProject();
        }
        navigate('HOME SCOPE');
      },
      (errorMessage) => alert(errorMessage)
    );
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
