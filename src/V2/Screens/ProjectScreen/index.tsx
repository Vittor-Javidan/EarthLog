import React, { useState, memo, useCallback, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import SubscriptionManager from '@SubscriptionManager';

import { ErrorCodes } from '@V2/Globals/ErrorsCodes';
import { translations } from '@V2/Translations/index';
import { SampleSettings } from '@V2/Types/ProjectTypes';
import ConfigService from '@V2/Services/ConfigService';
import CacheService from '@V2/Services/CacheService';
import AlertService from '@V2/Services/AlertService';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const ProjectScreen = memo(() => {

  const id_project            = useLocalSearchParams().id_project as string;
  const config                = useMemo(() => ConfigService.config, []);
  const RError                = useMemo(() => translations.global.errors[config.language], []);
  const [samples, setSamples] = useState<SampleSettings[]>(CacheService.allSamples);

  const onCreateSample = useCallback(async () => {
    if (SubscriptionManager.freeUserLimitCheck(samples.length >= SubscriptionManager.FREE_PLAN_MAX_SAMPLES)) {
      await AlertService.handleAlert(true, {
        type: 'Buy Subscription',
        message: RError(ErrorCodes.FREE_USER_SAMPLE_CREATION_LIMIT),
      }, () => {});
    } else {
      await AlertService.handleAlert(true, {
        type: 'sample creation',
        id_project: id_project,
      }, () => setSamples(CacheService.allSamples));
    }
  }, [samples]);

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
