import React, { useState, memo, useCallback, useMemo } from 'react';

import { ProjectRules, SampleSettings } from '@V2/Types/ProjectTypes';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';
import { CacheService } from '@V2/Services/CacheService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { Button } from '@V2/Button/index';
import { TC } from './__TC__';

export const Screen_AllSamples = memo((props: {
  id_project: string
  sampleAlias_Singular: string
  projectRules: ProjectRules
  onScreenButton_Home: () => void
  onScreenButton_Sample: (id_sample: string) => void
  onProjectDeletion_AfterUpload: () => void
}) => {

  const { id_project, projectRules } = props;
  const config                = useMemo(() => ConfigService.config, []);
  const theme                 = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const [samples, setSamples] = useState<SampleSettings[]>(CacheService.allSamples);

  const AllSamples = samples.map(sampleSettings => {
    const { id_sample, name } = sampleSettings
    return (
      <Button.TextWithIcon
        key={id_sample}
        title={name}
        iconName="clipboard"
        onPress={() => props.onScreenButton_Sample(id_sample)}
        theme={{
          font:              theme.font_Button,
          font_active:       theme.font_active,
          background:        theme.background_Button,
          background_active: theme.background_active,
        }}
      />
    )
  })

  const onCreateSample = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'sample creation',
      id_project: id_project,
      sampleNumber: samples.length + 1,
      sampleAlias_Singular: props.sampleAlias_Singular,
    }, () => setSamples(CacheService.allSamples));
  }, [props.sampleAlias_Singular, samples]);

  const onUploadProject = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'upload projects',
      id_project: id_project,
      onProjectDeletion: () => props.onProjectDeletion_AfterUpload(),
    }, () => {});
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          projectRules={projectRules}
          onHomePress={() => props.onScreenButton_Home()}
          onUploadProject={async () => await onUploadProject()}
          onCreateSample={async () => await onCreateSample()}
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
          {AllSamples}
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
