import React, { memo } from 'react';

import { GPS_DTO } from '@V1/Types/ProjectTypes';

import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const SampleInfoScreen = memo((props: {
  onSampleNameUpdate: (newName: string) => void
  onGPSReferenceUpdate: (gpsData: GPS_DTO) => void
}) => {
  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons />}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingHorizontal: 5,
        }}
      >
        <LC.SampleSettings
          onSampleNameUpdate={(newName) => props.onSampleNameUpdate(newName)}
          onGPSReferenceUpdate={(gpsData) => props.onGPSReferenceUpdate(gpsData)}
        />
      </Layout.ScrollView>
    </Layout.Screen>
  );
});
