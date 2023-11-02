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
    await fetchApi.uploadProject(controller.signal, processedProject, config,
      (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ])),
      async () => {

        /* TODO:
          Upload pictures one by one.
          The picture upload function must have 2 callbacks. One to be called after each success upload.
          And another to be called after process is finished or interrupted, to run the code present on
          this scope on this present moment.
        */

        await fetchApi.uploadImages({
          config: config,
          signal: controller.signal,
          id_project: props.id_project,
          picturesIDs: Object.keys(projectDTO.syncData.pictures),
        }, () => {
          console.log('Image uploaded!');
        }, (errorMessage) => {
          setError(errorMessage);
          setFeedbacks(prev => [ ...prev, errorMessage]);
          setShow(prev => ({ ...prev, errorDisplay: true }));
        },(feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ])));

        await afterUploadProcessing(processedProject);
        setFeedbacks(prev => [ ...prev, RS['Done!']]);
        AlertService.runAcceptCallback();
        props.closeModal();
      },
      (errorMessage) => {
        setError(errorMessage);
        setFeedbacks(prev => [ ...prev, RS['Error!']]);
        setShow(prev => ({ ...prev, errorDisplay: true }));
      }
    );

  }, [props.id_project]);

  const afterUploadProcessing = useCallback(async (projectDTO_AfterUpload: ProjectDTO) => {

    const { rules, id_project } = projectDTO_AfterUpload.projectSettings;

    if (rules.deleteAfterUpload === true) {

      /* TODO:
        - do not delete the project if still media to be upload.
        - Add an alert to tell some media still need to be uploaded.
          - When project status === 'uploaded' and some pictures stills as 'new' is a good reference.
      */

      setFeedbacks(prev => [ ...prev, R['Deleting project']]);
      await ProjectService.deleteProject(id_project, async () => {

        setFeedbacks(prev => [ ...prev, 'Updating cache']);
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
