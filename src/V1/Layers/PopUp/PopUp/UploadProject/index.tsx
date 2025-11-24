import React, { memo, useCallback, useMemo, useState } from 'react';

import {
  CredentialDTO
} from '@V1/Types';

import { translations } from '@V1/Translations/index';
import { UploadService } from '@V1/Services/UploadService';
import { ConfigService } from '@V1/Services/ConfigService';
import { CredentialService } from '@V1/Services/CredentialService';
import { CacheService } from '@V1/Services/CacheService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { LC } from '@V1/Layers/PopUp/__LC__';
import { FooterButtons } from './FooterButtons';

export const UploadProjects = memo((props: {
  config: {
    type: 'upload projects'
    id_project: string
    onProjectDeletion: () => void
  }
  closeModal: () => void
}) => {

  const { id_project } = props.config;
  const controller = useMemo(() => new AbortController(), []);
  const config     = useMemo(() => ConfigService.config, []);
  const RError     = useMemo(() => translations.global.errors[config.language], []);
  const RShared    = useMemo(() => translations.component.alert.shared[config.language], []);
  const R          = useMemo(() => translations.component.alert.uploadProject[config.language], []);
  const [error    , setError    ] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [show     , setShow     ] = useState({
    credentialsDisplay: true,
    loadingDisplay: false,
    errorDisplay: false,
  });
  const [credentials, _] = useState<CredentialDTO[]>(() => {
    const projectSettings = CacheService.getProjectFromCache({ id_project })
    return projectSettings.rules.uploadToURL
    ? CredentialService.allCredentials.filter(credential => projectSettings.rules.uploadToURL === credential.rootURL )
    : CredentialService.allCredentials
  })

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

    const uploadAPI = new UploadService(credential);
    await uploadAPI.uploadProject({
      config: config,
      signal: controller.signal,
      id_project: id_project,
      onSuccess: async () => {
        PopUpAPI.runAcceptCallback();
        props.closeModal();
        setFeedbacks(prev => [ ...prev, RShared['Done!']]);
      },
      onError: (errorMessage) => {
        setFeedbacks(prev => [ ...prev, RShared['Error!']]);
        setError(RError(errorMessage));
        setShow(prev => ({ ...prev, errorDisplay: true }));
      },
      onProjectDeletion: () => props.config.onProjectDeletion(),
      feedback: (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ])),
    });

  }, [id_project]);

  return (
    <LC.PopUp>
      <LC.CredentialsDisplay
        title={R['Upload this project to?']}
        showDisplay={show.credentialsDisplay}
        credentials={credentials}
        onCredentialChoose={async (credential) => await onCredentialChoose(credential)}
      />
      <LC.ErrorDisplay
        showDisplay={show.errorDisplay}
        error={error}
      />
      <LC.FeedbackDisplay
        showDisplay={show.loadingDisplay}
        feedbackMessage={feedbacks}
      />
      <FooterButtons
        onCancel={() => onCancel()}
      />
    </LC.PopUp>
  );
});
