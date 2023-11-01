import React, { useState, memo, useMemo, useCallback } from 'react';
import { View } from 'react-native';

import CacheService from '@Services/CacheService';

import { Animation } from '@Animation/index';
import { Layout } from '@Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';
import { ProjectSettings } from '@Types/ProjectTypes';
import AlertService from '@Services/AlertService';

export const HomeScreen = memo(() => {

  const lastOpenProjectSettings = useMemo(() => CacheService.lastOpenProject, [CacheService.lastOpenProject]);
  const [projects, setProject] = useState<ProjectSettings[]>(CacheService.allProjects);

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
          onCreateProject={onCreateProject}
          onDownloadProject={onDownloadProjects}
        />
      }
    >
      <Animation.SlideFromLeft
        delay={200}
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
