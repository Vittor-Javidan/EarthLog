import React, { memo, useCallback, useState } from 'react';
import { Dimensions, LayoutChangeEvent } from 'react-native';

import { CredentialDTO } from '@V1/Types/AppTypes';
import CredentialService from '@V1/Services/CredentialService';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const CredentialSelectionScreen = memo(() => {

  const [credentials   , setCredentials   ] = useState<CredentialDTO[]>(CredentialService.allCredentials);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

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

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    if (event.nativeEvent.layout.height > 0) {
      setStartAnimation(true);
    }
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCreateCredential={onCreateCredential}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
        start={startAnimation}
        onLayout={event => onLayout(event)}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 5,
            paddingBottom: Dimensions.get('window').height - 410,
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
