import React, { useState, memo, useMemo, useCallback } from 'react';
import { View } from 'react-native';

import { ProjectSettings } from '@V1/Types/ProjectTypes';
import CacheService from '@V1/Services/CacheService';
import AlertService from '@V1/Services/AlertService';

import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const HomeScreen = memo(() => {

  const lastOpenProjectSettings = useMemo(() => CacheService.lastOpenProject, [CacheService.lastOpenProject]);
  const [projects, setProject]  = useState<ProjectSettings[]>(CacheService.allProjects);

  const onCreateProject = useCallback(async () => {
    await AlertService.handleAlert(true, {
      type: 'project creation',
    }, () => setProject(CacheService.allProjects));
  }, []);

  const onDownloadProjects = useCallback(async () => {
    await AlertService.handleAlert(true, {
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
            />
          )}
          <LC.ProjectButtons
            projects={projects}
          />
        </View>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
