import React, { memo, useCallback, useState } from 'react';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';
import CredentialService from '@Services/CredentialService';
import { CredentialDTO } from '@Types/AppTypes';

export const CredentialSelectionScreen = memo(() => {

  const [credentials, setCredentials] = useState<CredentialDTO[]>(CredentialService.allCredentials);

  const onCreateCredential = useCallback(async () => {
    const newCredential = CredentialService.getNewCredential();
    await CredentialService.createCredential(newCredential);
    const newData: CredentialDTO[] = [ ...credentials, newCredential ];
    CredentialService.allCredentials = newData;
    setCredentials(newData);
  }, [credentials]);

  const onDeleteCredential = useCallback(async (index: number) => {
    const newData: CredentialDTO[] = [ ...credentials ];
    const removedCredential = newData.splice(index, 1)[0];
    await CredentialService.deleteCredential(removedCredential);
    CredentialService.allCredentials = newData;
    setCredentials(newData);
  }, [credentials]);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCreateCredential={onCreateCredential}
        />
      }
    >
      <Animation.SlideFromLeft
        delay={200}
        duration={200}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 5,
            gap: 10,
          }}
        >
          <LC.AllCredentials
            credentials={credentials}
            onDeleteCredential={onDeleteCredential}
          />
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
