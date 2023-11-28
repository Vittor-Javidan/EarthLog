import React, { memo } from 'react';

import { CredentialDTO } from '@V1/Types/AppTypes';

import { CredentialWidget } from './CredentialWidget';

export const AllCredentials = memo((props: {
  credentials: CredentialDTO[]
  onDeleteCredential: (index: number) => void
}) => {

  const AllCredentialCards = props.credentials.map((credential, index) => (
    <CredentialWidget
      key={credential.credential_id}
      credential={credential}
      onCredentialDelete={() => props.onDeleteCredential(index)}
    />
  ));

  return (<>{AllCredentialCards}</>);
});
