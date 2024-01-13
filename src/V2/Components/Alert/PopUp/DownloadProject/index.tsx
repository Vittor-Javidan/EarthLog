import React, { memo, useCallback, useMemo, useState } from 'react';

import { VERSION } from '@V2/Globals/Version';
import { ErrorCodes } from '@V2/Globals/ErrorsCodes';
import { CredentialDTO } from '@V2/Types/AppTypes';
import { ProjectSettings } from '@V2/Types/ProjectTypes';
import { translations } from '@V2/Translations/index';
import DownloadService from '@V2/Services/DownloadService';
import ConfigService from '@V2/Services/ConfigService';
import AlertService from '@V2/Services/AlertService';

import { LC } from '@V2/Alert/__LC__';
import { ProjectsDisplay } from './ProjectsDisplay';
import { FooterButtons } from './FooterButtons';

export const DownloadProjects = memo((props: {
  closeModal: () => void
}) => {

  const controller = useMemo(() => new AbortController(), []);
  const config     = useMemo(() => ConfigService.config, []);
  const RError     = useMemo(() => translations.global.errors[config.language], []);
  const RShared    = useMemo(() => translations.component.alert.shared[config.language], []);
  const R          = useMemo(() => translations.component.alert.downloadProjecs[config.language], []);

  const [allProjects      , setAllProjects         ] = useState<ProjectSettings[] | null>(null);
  const [downloadAPi      , setDownloadAPI         ] = useState<DownloadService | null>(null);
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

    const downloadAPI = new DownloadService(credential);
    await downloadAPI.getAvailableProjects({
      signal: controller.signal,
      onSuccess: (projects) => {
        const projects_ltsVersion1 = projects.filter(project => (project.lts_version === VERSION));
        setAllProjects(projects_ltsVersion1);
        setFeedbacks(prev => [ ...prev, RShared['Done!']]);
        setTimeout(() => {
          setShow(prev => ({ ...prev,
            projectsDisplay: true,
            loadingDisplay: false,
          }));
        }, 200);
      },
      onError: (errorMessage) => {
        setError(RError(errorMessage));
        setFeedbacks(prev => [ ...prev, RShared['Error!']]);
      },
      feedback: (feedbackMessage) => {
        setFeedbacks(prev => ([...prev, feedbackMessage]));
      },
    });

    setDownloadAPI(downloadAPI);

  }, []);

  const onSelectProject = useCallback((project_id: string, selected: boolean) => {
    const newRecord = { ...selectedProjects };
    selected ? newRecord[project_id] = selected : delete newRecord[project_id];
    setAllSelectedProjects(newRecord);
    setShow(prev => ({ ...prev, confirmButton: Object.keys(newRecord).length > 0 }));
  }, [selectedProjects]);

  const onConfirm = useCallback(async () => {

    if (allProjects === null || downloadAPi === null) {
      return;
    }

    setFeedbacks([R['Starting processing']]);
    setShow(prev => ({ ...prev,
      loadingDisplay: true,
      confirmButton: false,
      projectsDisplay: false,
    }));

    await downloadAPi.downloadProjects({
      signal: controller.signal,
      projectIDs: Object.keys(selectedProjects),
      onFinish: () => {
        setFeedbacks(prev => [ ...prev, RShared['Done!']]);
        AlertService.runAcceptCallback();
        props.closeModal();
      },
      onError: (errorMessage) => {
        setError(RError(errorMessage));
        setFeedbacks(prev => [ ...prev, RShared['Error!']]);
        if (errorMessage === ErrorCodes.FREE_USER_DOWNLOAD_RESTRICTION) {
          props.closeModal();
          AlertService.handleAlert(true, {
            type: 'Buy Subscription',
            message: RError(errorMessage),
          }, () => {});
        }
      },
      feedback: (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ])),
    });

  }, [props.closeModal, allProjects, selectedProjects, downloadAPi]);

  return (
    <LC.PopUp>
      <LC.CredentialsDisplay
        title={R['Download new projects from?']}
        showDisplay={show.credentialDisplay}
        onCredentialChoose={async (credential) => await onCredentialChoose(credential)}
      />
      <LC.ErrorDisplay
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
      <LC.FeedbackDisplay
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
