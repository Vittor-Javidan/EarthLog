import React, { useState, memo, useMemo, useCallback } from 'react';
import { View } from 'react-native';

import { ProjectSettings } from '@V2/Types/ProjectTypes';
import { CacheService } from '@V2/Services/CacheService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const Screen_Home = memo((props: {
  onScreenButton_Project: (id_project: string) => void
}) => {

  const lastOpenProjectSettings = useMemo(() => CacheService.lastOpenProject, [CacheService.lastOpenProject]);
  const [projects, setProject]  = useState<ProjectSettings[]>(CacheService.allProjects);

  const onCreateProject = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'project creation',
    }, () => setProject(CacheService.allProjects));
  }, []);

  const onDownloadProjects = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'download projects',
    }, () => setProject(CacheService.allProjects));
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCreateProject={async () => await onCreateProject()}
          onDownloadProject={async () => await onDownloadProjects()}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            paddingHorizontal: 5,
            gap: 10,
            paddingBottom: 80,
          }}
        >
          <LC.SocialMediaButtons />
          {lastOpenProjectSettings && (
            <LC.LastProjectButton
              projectSettings={lastOpenProjectSettings}
              onButtonPress={() => props.onScreenButton_Project(lastOpenProjectSettings.id_project)}
            />
          )}
          <LC.ProjectButtons
            projects={projects}
            onProjectButtonPress={(id_project) => props.onScreenButton_Project(id_project)}
          />
        </View>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
