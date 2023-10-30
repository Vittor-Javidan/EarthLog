import React, { useCallback, useState } from 'react';

import { CredentialDTO } from '@Types/AppTypes';
import CredentialService from '@Services/CredentialService';

import { CredentialWidget } from './CredentialWidget';

export function F_AllCredentials() {

  const [_, refresher] = useState<boolean>(false);

  const onDeleteCredential = useCallback(async (credential: CredentialDTO) => {
    await CredentialService.deleteCredential(credential);
    refresher(prev => !prev);
  }, []);

  const AllCredentialCards = CredentialService.allCredentials.map(credential => (
    <CredentialWidget
      key={credential.credential_id}
      credential={credential}
      onCredentialDelete={async () => await onDeleteCredential(credential)}
    />
  ));

  return (<>{AllCredentialCards}</>);
}
