import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO } from '@Types/AppTypes';
import { ProjectDTO } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';
import AlertService from '@Services/AlertService';
import CacheService from '@Services/CacheService';
import SyncService from '@Services/SyncService';
import FetchAPIService from '@APIServices/FetchAPIService';
import DataProcessService from '@APIServices/DataProcessService';

import { LC } from '@Alert/__LC__';
import { CredentialsDisplay } from './CredentialsDisplay';
import { ErrorDisplay } from './ErrorDisplay';
import { FooterButtons } from './FooterButtons';

export const UploadProjects = memo((props: {
  id_project: string
  closeModal: () => void
}) => {

  const controller = useMemo(() => new AbortController(), []);
  const config     = useMemo(() => ConfigService.config, []);
  const RS         = useMemo(() => translations.component.alert.shared[config.language], []);
  const R          = useMemo(() => translations.component.alert.uploadProject[config.language], []);
  const [error    , setError    ] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [show     , setShow     ] = useState({
    credentialsDisplay: true,
    loadingDisplay: false,
    errorDisplay: false,
  });

  const onCancel = useCallback(() => {
    props.closeModal();
    controller.abort();
  }, [props.closeModal]);

  const onCredentialChoose = useCallback(async (credential: CredentialDTO) => {

    setFeedbacks([]);
    setShow(prev => ({ ...prev,
      loadingDisplay: true,
      credentialsDisplay: false,
    }));

    const projectDTO = await DataProcessService.buildProjectFromDatabase(props.id_project, config,
      (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ]))
    );

    const processedProject = DataProcessService.attachUploadEntry(credential, projectDTO, config,
      (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ]))
    );

    const fetchApi = new FetchAPIService(credential);
    await fetchApi.uploadProject({
      config: config,
      signal: controller.signal,
      projectDTO: processedProject,
      onImageUpload: (id_UploadedPicture) => {
        processedProject.syncData.pictures[id_UploadedPicture] = 'uploaded';
      },
      onSuccess: async () => {
        await afterUploadProcessing(processedProject);
        AlertService.runAcceptCallback();
        props.closeModal();
        setFeedbacks(prev => [ ...prev, RS['Done!']]);
      },
      onProjectUploadError: (projectUploadErrorMessage) => {
        setFeedbacks(prev => [ ...prev, RS['Error!']]);
        setError(projectUploadErrorMessage);
        setShow(prev => ({ ...prev, errorDisplay: true }));
      },
      onImageUploadError: async (imageUploadErrorMessage) => {
        await afterUploadProcessing(processedProject);
        AlertService.runAcceptCallback();
        setFeedbacks(prev => [ ...prev, RS['Error!']]);
        setError(imageUploadErrorMessage);
        setShow(prev => ({ ...prev, errorDisplay: true }));
      },
      feedback: (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ])),
    });

  }, [props.id_project]);

  const afterUploadProcessing = useCallback(async (projectDTO_AfterUpload: ProjectDTO) => {

    const { rules, id_project } = projectDTO_AfterUpload.projectSettings;
    const isAllPicturesUploaded = !Object.values(projectDTO_AfterUpload.syncData.pictures).includes('new');

    if (rules.deleteAfterUpload === true && isAllPicturesUploaded) {

      setFeedbacks(prev => [ ...prev, R['Deleting project']]);
      await ProjectService.deleteProject(id_project, async () => {

        setFeedbacks(prev => [ ...prev, R['Updating cache']]);
        if (CacheService.lastOpenProject?.id_project === id_project) {
          await CacheService.deleteLastOpenProject();
        }
        navigate('HOME SCOPE');

      }, (errorMessage) => {
        setError(errorMessage);
        setFeedbacks(prev => [ ...prev, RS['Error!']]);
        setShow(prev => ({ ...prev, errorDisplay: true }));
      });
      return;
    }

    if (!isAllPicturesUploaded) {
      /*TODO:
        block code for when not all pictures was uplodaded
      */
    }

    setFeedbacks(prev => [ ...prev, R['Updating project locally']]);
    await ProjectService.updateProject({
      projectSettings: projectDTO_AfterUpload.projectSettings,
      sync: false,
    }, async () => {

      setFeedbacks(prev => [ ...prev, R['Updating cache']]);
      CacheService.lastOpenProject = projectDTO_AfterUpload.projectSettings;

      setFeedbacks(prev => [ ...prev, R['Updating sync data file']]);
      await SyncService.syncData_AfterUpload(projectDTO_AfterUpload.syncData);

    }, (errorMessage) => {
      setError(errorMessage);
      setFeedbacks(prev => [ ...prev, RS['Error!']]);
      setShow(prev => ({ ...prev, errorDisplay: true }));
    });

  }, []);

  return (
    <LC.PopUp>
      <CredentialsDisplay
        showDisplay={show.credentialsDisplay}
        onCredentialChoose={async (credential) => await onCredentialChoose(credential)}
      />
      <ErrorDisplay
        showDisplay={show.errorDisplay}
        error={error}
      />
      <LC.Feedback
        showDisplay={show.loadingDisplay}
        feedbackMessage={feedbacks}
      />
      <FooterButtons
        onCancel={() => onCancel()}
      />
    </LC.PopUp>
  );
});
