import React, { useCallback, useState } from 'react';

import { CredentialDTO } from '@Types/AppTypes';
import CredentialService from '@Services/CredentialService';
import CacheService from '@Services/CacheService';

import { CredentialWidget } from './CredentialWidget';

export function F_AllCredentials() {

  const [_, refresher] = useState<boolean>(false);

  const onDeleteCredential = useCallback(async (credential: CredentialDTO) => {
    await CredentialService.deleteCredential(credential);
    await CacheService.loadAllCredentials();
    refresher(prev => !prev);
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
