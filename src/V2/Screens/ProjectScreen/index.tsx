import React, { useState, memo, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { SampleSettings } from '@V2/Types/ProjectTypes';
import CacheService from '@V2/Services/CacheService';
import { AlertAPI } from '@V2/Layers/API/Alert';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const ProjectScreen = memo((props: {
  sampleAlias_Singular: string
}) => {

  const id_project            = useLocalSearchParams().id_project as string;
  const [samples, setSamples] = useState<SampleSettings[]>(CacheService.allSamples);

  const onCreateSample = useCallback(async () => {
    await AlertAPI.handleAlert(true, {
      type: 'sample creation',
      id_project: id_project,
      sampleNumber: samples.length + 1,
      sampleAlias_Singular: props.sampleAlias_Singular,
    }, () => setSamples(CacheService.allSamples));
  }, [props.sampleAlias_Singular, samples]);

  const onUploadProject = useCallback(async () => {
    await AlertAPI.handleAlert(true, {
      type: 'upload projects',
      id_project: id_project,
    }, () => {});
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCreateSample={async () => await onCreateSample()}
          onUploadProject={async () => await onUploadProject()}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            gap: 1,
          }}
        >
          <LC.SampleButtons
            samples={samples}
          />
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
