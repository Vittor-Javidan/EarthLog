import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO } from '@Types/AppTypes';
import { DownloadedProjectDTO } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';
import SyncService from '@Services/SyncService';
import ConfigService from '@Services/ConfigService';
import DataProcessService from '@APIServices/DataProcessService';
import FetchAPIService from '@APIServices/FetchAPIService';

import { LC } from '@Alert/__LC__';
import { CredentialsDisplay } from './CredentialsDisplay';
import { ErrorDisplay } from './ErrorDisplay';
import { ProjectsDisplay } from './ProjectsDisplay';
import { FooterButtons } from './FooterButtons';

export const DownloadProjects = memo((props: {
  closeModal: () => void
}) => {

  const controller = useMemo(() => new AbortController(), []);
  const config     = useMemo(() => ConfigService.config, []);
  const RS         = useMemo(() => translations.component.alert.shared[config.language], []);
  const R          = useMemo(() => translations.component.alert.downloadProjecs[config.language], []);

  const [allProjects      , setAllProjects         ] = useState<DownloadedProjectDTO[] | null>(null);
  const [selectedProjects , setAllSelectedProjects ] = useState<Record<string, boolean>>({});
  const [error            , setError               ] = useState<string | null>(null);
  const [feedbacks        , setFeedbacks           ] = useState<string[]>([]);
  const [show             , setShow                ] = useState({
    credentialDisplay: true,
    loadingDisplay:    false,
    projectsDisplay:   false,
    confirmButton:     false,
  });

  const showErrorDisplay = error !== null;

  const onCancel = useCallback(() => {
    props.closeModal();
    controller.abort();
  }, [props.closeModal]);

  const onCredentialChoose = useCallback(async (credential: CredentialDTO) => {

    setFeedbacks([]);
    setShow(prev => ({ ...prev,
      credentialDisplay: false,
      loadingDisplay:    true,
    }));

    const fetchAPI = new FetchAPIService(credential);
    await fetchAPI.downloadProjects(controller.signal, config,
      (feedbackMessage) => setFeedbacks(prev => ([...prev, feedbackMessage])),
      (projects) => {
        setAllProjects(projects);
        setFeedbacks(prev => [ ...prev, RS['Done!']]);
        setTimeout(() => {
          setShow(prev => ({ ...prev,
            projectsDisplay: true,
            loadingDisplay: false,
          }));
        }, 200);
      },
      (errorMessage) => {
        setError(errorMessage);
        setFeedbacks(prev => [ ...prev, RS['Error!']]);
      },
    );
  }, []);

  const onSelectProject = useCallback((project_id: string, selected: boolean) => {
    setAllSelectedProjects(prev => {
      const newRecord = { ...prev };
      selected === true ? newRecord[project_id] = selected : delete newRecord[project_id];
      setShow(prev => ({ ...prev, confirmButton: Object.keys(newRecord).length > 0 }));
      return newRecord;
    });
  }, []);

  const onConfirm = useCallback(async () => {

    if (allProjects === null) {
      return;
    }

    setFeedbacks([R['Starting processing']]);
    setShow(prev => ({ ...prev,
      loadingDisplay: true,
      confirmButton: false,
      projectsDisplay: false,
    }));

    const allSelectedProjectsKeys = Object.keys(selectedProjects);
    const allSelectedProjects = allProjects.filter(projects =>
      allSelectedProjectsKeys.includes(projects.projectSettings.id_project)
    );

    for (let i = 0; i < allSelectedProjects.length; i++) {

      const processedProject = DataProcessService.processDownloadedProject(allSelectedProjects[i], config,
        (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage])),
      );

      await ProjectService.createProject(processedProject, config, () => {
        CacheService.addToAllProjects(processedProject.projectSettings);
        SyncService.addToSyncData(processedProject.syncData);
        setFeedbacks(prev => [ ...prev, RS['Done!']]);
      }, (errorMessage) => {
        setError(errorMessage);
        setFeedbacks(prev => [ ...prev, RS['Error!']]);
      }, (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ])));
    }

    AlertService.runAcceptCallback();
    props.closeModal();

  }, [props.closeModal, allProjects, selectedProjects]);

  return (
    <LC.PopUp>
      <CredentialsDisplay
        showDisplay={show.credentialDisplay}
        onCredentialChoose={async (credential) => await onCredentialChoose(credential)}
      />
      <ErrorDisplay
        showDisplay={showErrorDisplay}
        error={error}
      />
      {allProjects !== null && (
        <ProjectsDisplay
          downloadedProjects={allProjects}
          showDisplay={show.projectsDisplay}
          onSelect={(project_id, selected) => onSelectProject(project_id, selected)}
        />
      )}
      <LC.Feedback
        showDisplay={show.loadingDisplay}
        feedbackMessage={feedbacks}
      />
      <FooterButtons
        showConfirmButton={show.confirmButton}
        onCancel={() => onCancel()}
        onConfirm={async () => await onConfirm()}
      />
    </LC.PopUp>
  );
});
