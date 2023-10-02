import React, { useCallback, useMemo, useState } from 'react';

import { CredentialDTO } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import AlertService from '@Services/AlertService';
import ConfigService from '@Services/ConfigService';
import CredentialService from '@Services/CredentialService';

import { CredentialWidget } from './CredentialWidget';
import CacheService from '@Services/CacheService';

export function AllCredentials() {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.credentialScreen[config.language], []);

  const [_, refresher] = useState<boolean>(false);

  const onDeleteCredential = useCallback(async (credential: CredentialDTO) => {
    await AlertService.handleAlert(true,
      {
        type: 'warning',
        question: R['Confirm to delete this credential.'],
      },
      async () => {
        await CredentialService.deleteCredential(credential);
        await CacheService.loadAllCredentials();
        refresher(prev => !prev);
      },
    );
  }, []);

  const AllCredentialCards = CacheService.allCredentials.map(credential => (
    <CredentialWidget
      key={credential.credential_id}
      credential={credential}
      onCredentialDelete={async () => await onDeleteCredential(credential)}
    />
  ));

  return (<>{AllCredentialCards}</>);
}
