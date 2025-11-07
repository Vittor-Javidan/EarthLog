import React, { memo, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';

import { ProjectSettings, WidgetData } from '@V2/Types/ProjectTypes';
import { ProjectService } from '@V2/Services/ProjectService';
import { CacheService } from '@V2/Services/CacheService';
import { MediaService } from '@V2/Services/MediaService';

import { Layout } from '@V2/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const Screen_ProjectInfo = memo((props: {
  id_project: string
  projectSettings: ProjectSettings
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange_Plural: (newAliasName: string) => void
  onSampleAliasChange_Singular: (newAliasName: string) => void
  onScreenButton_DeleteProject: () => void
}) => {

  const { id_project, projectSettings } = props;
  const [projectWidgets, setProjectWidgets] = useState<WidgetData[]>(CacheService.allWidgets_Project);

  const onCreateWidget = useCallback(async () => {
    const newWidget = ProjectService.getWidgetData();
    await ProjectService.createWidget({
      path: 'project widgets',
      id_project: id_project,
      widgetData: newWidget,
      sync: true,
      onSuccess: () => {
        CacheService.addToAllWidgets_Project({ widgetData: newWidget});
        setProjectWidgets(CacheService.allWidgets_Project);
      },
      onError: (errorMessage) => alert(errorMessage),
    });
  }, [projectWidgets]);

  const onDeleteWidget = useCallback(async (index: number) => {
    const newData: WidgetData[] = [ ...projectWidgets ];
    const removedWidget = newData.splice(index, 1)[0];
    await ProjectService.deleteWidget({
      path: 'project widgets',
      id_project: id_project,
      widgetData: removedWidget,
      sync: true,
      onSuccess: async () => {
        await MediaService.deleteMediaRecursively({
          scope: 'widget',
          id_project: id_project,
          widget: removedWidget,
        });
        CacheService.allWidgets_Project = newData;
        setProjectWidgets(newData);
      },
      onError: (errorMessage) => alert(errorMessage),
    });
  }, [projectWidgets]);

  const onDeleteProject = useCallback(async () => {
    await CacheService.deleteLastOpenProject();
    await ProjectService.deleteProject({
      id_project,
      onSuccess: () => {
        CacheService.removeFromProjects({ id_project });
        props.onScreenButton_DeleteProject();
      },
      onError: (errorMessage) => alert(errorMessage),
    });
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          projectRules={projectSettings.rules}
          onCreateWidget={async () => await onCreateWidget()}
          onDeleteProject={async () => await onDeleteProject()}
        />
      }
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingHorizontal: 5,
          paddingBottom: Dimensions.get('window').height - 240,
          gap: 10,
        }}
      >
        <LC.ProjectSettingsWidget
          projectSettings={projectSettings}
          onProjectNameUpdate={(newName) => props.onProjectNameUpdate(newName)}
          onSampleAliasChange_Plural={(newAlias) => props.onSampleAliasChange_Plural(newAlias)}
          onSampleAliasChange_Singular={(newAlias) => props.onSampleAliasChange_Singular(newAlias)}
        />
        <LC.ProjectWidgets
          id_project={id_project}
          projectWidgets={projectWidgets}
          onDeleteWidget={async (index) => await onDeleteWidget(index)}
        />
      </Layout.ScrollView>
    </Layout.Screen>
  );
});
