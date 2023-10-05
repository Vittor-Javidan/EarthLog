import React from 'react';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export function SampleInfoScreen(props: {
  sampleScopeState: 'Loaded' | 'Loading'
  onSampleNameUpdate: (newName: string) => void
  onGPSReferenceUpdate: () => void
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
          contentContainerStyle={{
            paddingHorizontal: 5,
          }}
        >
          <LC.SampleSettings
            onSampleNameUpdate={(newName) => props.onSampleNameUpdate(newName)}
            onGPSReferenceUpdate={() => props.onGPSReferenceUpdate()}
          />
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
}