import React, { memo } from 'react';

import { GPS_DTO } from '@Types/ProjectTypes';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const SampleInfoScreen = memo((props: {
  sampleScopeState: 'Loaded' | 'Loading'
  onSampleNameUpdate: (newName: string) => void
  onGPSReferenceUpdate: (gpsData: GPS_DTO) => void
}) => {
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
            onGPSReferenceUpdate={(gpsData) => props.onGPSReferenceUpdate(gpsData)}
          />
        </Layout.ScrollView>
      )}
    </Layout.Screen>
  );
});
