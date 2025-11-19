import React, { memo, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';

import { CredentialDTO } from '@V1/Types/AppTypes';
import { CredentialService } from '@V1/Services/CredentialService';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const Screen_CredentialSelection = memo((props: {
  onScreenButton_Home: () => void
}) => {

  const [credentials, setCredentials] = useState<CredentialDTO[]>(CredentialService.allCredentials);

  const onCreateCredential = useCallback(async () => {
    const newCredential = CredentialService.getNewCredential();
    await CredentialService.createCredential({ credential: newCredential});
    const newData: CredentialDTO[] = [ ...credentials, newCredential ];
    CredentialService.allCredentials = newData;
    setCredentials(newData);
  }, [credentials]);

  const onDeleteCredential = useCallback(async (index: number) => {
    const newData: CredentialDTO[] = [ ...credentials ];
    const removedCredential = newData.splice(index, 1)[0];
    await CredentialService.deleteCredential({ credential: removedCredential });
    CredentialService.allCredentials = newData;
    setCredentials(newData);
  }, [credentials]);

  const AllCredentials = credentials.map((credential, index) => (
    <LC.CredentialWidget
      key={credential.credential_id}
      credential={credential}
      onCredentialDelete={() => onDeleteCredential(index)}
    />
  ));

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCreateCredential={onCreateCredential}
          onHomePress={() => props.onScreenButton_Home()}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 5,
            paddingBottom: Dimensions.get('screen').height - 410,
            gap: 10,
          }}
        >
          {AllCredentials}
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
