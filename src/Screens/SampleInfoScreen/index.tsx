import React from 'react';

import { Layout } from '@Components/Layout';
import { TC } from './__TC__';
import { LC } from './__LC__';

export function SampleInfoScreen(props: {
  sampleScopeState: 'Loaded' | 'Loading'
  onSampleNameUpdate: (newName: string) => void
}) {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
      style={{
        paddingTop: 55,
      }}
    >
      {props.sampleScopeState === 'Loading' ? (
        <Layout.Loading />
      ) : (
        <Layout.ScrollView
          contenContainerStyle={{
            paddingHorizontal: 5,
          }}
        >
          <LC.SampleSettings
            onSampleNameUpdate={(newName) => props.onSampleNameUpdate(newName)}
          />
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
}
