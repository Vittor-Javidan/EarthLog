import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO, Loading } from '@Types/AppTypes';
import { ProjectDTO } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import ConfigService from '@Services/ConfigService';
import DateTimeService from '@Services/DateTimeService';
import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
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

    // Project status update ======================
    projectDTO.projectSettings.status = 'uploaded';
    await ProjectService.updateProject(projectDTO.projectSettings,
      () => CacheService.updateCache_ProjectSettings(projectDTO.projectSettings),
      (errorMessage) => setError(errorMessage),
    );

    // Widgets_project updated status ==========================
    for (let i = 0; i < projectDTO.projectWidgets.length; i++) {
      if (projectDTO.projectWidgets[i].status !== 'uploaded') {
        projectDTO.projectWidgets[i].status = 'uploaded';
        await ProjectService.updateWidget_Project(id_project, projectDTO.projectWidgets[i],
          () => CacheService.updateCache_ProjectWidget(projectDTO.projectWidgets[i]),
          (errorMessage) => setError(errorMessage),
        );
      }
    }

    // Widgets_template updated status ===================
    for (let i = 0; i < projectDTO.template.length; i++) {
      if (projectDTO.template[i].status !== 'uploaded') {
        projectDTO.template[i].status = 'uploaded';
        await ProjectService.updateWidget_Template(id_project, projectDTO.template[i],
          () => CacheService.updateCache_TemplateWidget(projectDTO.template[i]),
          (errorMessage) => setError(errorMessage)
        );
      }
    }

    // Samples update status ============================
    for (let i = 0; i < projectDTO.samples.length; i++) {
      if (projectDTO.samples[i].sampleSettings.status !== 'uploaded') {
        projectDTO.samples[i].sampleSettings.status = 'uploaded';
        await ProjectService.updateSample(id_project, projectDTO.samples[i].sampleSettings,
          () => CacheService.updateCache_SampleSettings(projectDTO.samples[i].sampleSettings),
          (errorMessage) => setError(errorMessage)
        );

        // Widgets_sample update status ======================================
        for (let j = 0; j < projectDTO.samples[i].sampleWidgets.length; j++) {
          if (projectDTO.samples[i].sampleWidgets[j].status !== 'uploaded') {
            projectDTO.samples[i].sampleWidgets[j].status = 'uploaded';
            const id_sample = projectDTO.samples[i].sampleSettings.id_sample;
            const widgetData = projectDTO.samples[i].sampleWidgets[j];
            await ProjectService.updateWidget_Sample(id_project, id_sample, widgetData,
              () => {/* No need to update cache on this scope*/},
              (errorMessage) => setError(errorMessage)
            );
          }
        }
      }
    }

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
