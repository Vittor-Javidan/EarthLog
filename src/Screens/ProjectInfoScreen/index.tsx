import React, { memo, useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { WidgetData } from '@Types/ProjectTypes';
import { navigate } from '@Globals/NavigationControler';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import MediaService from '@Services/MediaService';

import { Layout } from '@Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const ProjectInfoScreen = memo((props: {
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange_Plural: (newAliasName: string) => void
}) => {

  const id_project = useLocalSearchParams().id_project as string;
  const [projectWidgets, setProjectWidgets] = useState<WidgetData[]>(CacheService.allWidgets_Project);

  const onCreateWidget = useCallback(async () => {
    const newWidget = ProjectService.getWidgetData();
    await ProjectService.createWidget({
      path: 'project widgets',
      id_project: id_project,
      widgetData: newWidget,
      sync: true,
    }, () => {
      CacheService.addToAllWidgets_Project(newWidget);
      setProjectWidgets(CacheService.allWidgets_Project);
    }, (errorMessage) => alert(errorMessage));
  }, [projectWidgets]);

  const onDeleteWidget = useCallback(async (index: number) => {
    const newData: WidgetData[] = [ ...projectWidgets ];
    const removedWidget = newData.splice(index, 1)[0];
    await ProjectService.deleteWidget({
      path: 'project widgets',
      id_project: id_project,
      widgetData: removedWidget,
      sync: true,
    }, async () => {
      await MediaService.deleteMedia({
        scope: 'widget',
        id_project: id_project,
        widget: removedWidget,
      }, async () => await CacheService.loadAllPicturesNameFiles(id_project));
      CacheService.allWidgets_Project = newData;
      setProjectWidgets(newData);
    }, (errorMessage) => alert(errorMessage));
  }, [projectWidgets]);

  const onDeleteProject = useCallback(async () => {
    await CacheService.deleteLastOpenProject();
    await ProjectService.deleteProject(id_project,
      () => {
        CacheService.removeFromProjects(id_project);
        navigate('HOME SCOPE');
      },
      (errorMessage) => alert(errorMessage)
    );
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onCreateWidget={onCreateWidget}
          onDeleteProject={onDeleteProject}
        />
      }
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingBottom: 150,
          paddingHorizontal: 5,
          gap: 10,
        }}
      >
        <LC.ProjectSettingsWidget
          onProjectNameUpdate={props.onProjectNameUpdate}
          onSampleAliasChange_Plural={props.onSampleAliasChange_Plural}
        />
        <LC.ProjectWidgets
          id_project={id_project}
          projectWidgets={projectWidgets}
          onDeleteWidget={onDeleteWidget}
        />
      </Layout.ScrollView>
    </Layout.Screen>
  );
});
