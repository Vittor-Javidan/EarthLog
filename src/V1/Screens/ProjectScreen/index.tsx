import React, { useState, memo, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { SampleSettings } from '@V1/Types/ProjectTypes';
import CacheService from '@V1/Services/CacheService';
import AlertService from '@V1/Services/AlertService';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const ProjectScreen = memo(() => {

  const id_project = useLocalSearchParams().id_project as string;
  const [samples, setSamples] = useState<SampleSettings[]>(CacheService.allSamples);

  const onCreateSample = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'sample creation',
      id_project: id_project,
    }, () => setSamples(CacheService.allSamples));
  }, []);

  const onUploadProject = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'upload projects',
      id_project: id_project,
    }, () => {});
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCreateSample={onCreateSample}
          onUploadProject={onUploadProject}
        />
      }
    >
      <Animation.SlideFromLeft
        delay={200}
        duration={200}
      >
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            paddingBottom: 150,
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
