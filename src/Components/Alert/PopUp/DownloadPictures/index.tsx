import React, { memo, useCallback, useMemo, useState } from 'react';

import { CredentialDTO } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import DownloadService from '@Services/DownloadService';
import ConfigService from '@Services/ConfigService';
import AlertService from '@Services/AlertService';

import { LC } from '@Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const DownloadPictures = memo((props: {
  id_project: string
  picturesIDs: string[]
  closeModal: () => void
}) => {

  const controller = useMemo(() => new AbortController(), []);
  const config     = useMemo(() => ConfigService.config, []);
  const RS         = useMemo(() => translations.component.alert.shared[config.language], []);
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

    const downloadAPI = new DownloadService(credential);
    await downloadAPI.downloadPictures({
      signal: controller.signal,
      id_project: props.id_project,
      picturesIDs: props.picturesIDs,
      onFinish: async () => {
        AlertService.runAcceptCallback();
        props.closeModal();
        setFeedbacks(prev => [ ...prev, RS['Done!']]);
      },
      onError: (errorMessage) => {
        setFeedbacks(prev => [ ...prev, RS['Error!']]);
        setError(errorMessage);
        setShow(prev => ({ ...prev, errorDisplay: true }));
      },
      feedback: (feedbackMessage) => setFeedbacks(prev => ([ ...prev, feedbackMessage ])),
    });

  }, [props.id_project]);

  return (
    <LC.PopUp>
      <LC.CredentialsDisplay
        title={'Download picture from?'}
        showDisplay={show.credentialsDisplay}
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
