import React, { memo, useState } from 'react';

import { Loading } from '@Types/AppTypes';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const CredentialSelectionScreen = memo((props: {
  credentialScopeState: Loading
}) => {

  const [_, refresh] = useState<boolean>(false);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCredentialCreation={() => refresh(prev => !prev)}
        />
      }
    >
      {props.credentialScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
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
            <LC.F_AllCredentials />
          </Layout.ScrollView>
        </Animation.SlideFromLeft>
      )}
    </Layout.Screen>
  );
});
