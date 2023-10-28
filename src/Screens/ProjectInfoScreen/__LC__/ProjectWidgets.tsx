import React, { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { WidgetData } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import SyncService from '@Services/SyncService';

import { Widget } from '@Widget/index';
import { Layout } from '@Layout/index';
import { ProjectSettingsWidget } from './ProjectSettingsWidget';

export function F_ProjectWidgets(props: {
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange_Plural: (newSampleAlias: string) => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const [_, refresh] = useState<boolean>(true);

  const onDeleteWidget_Project = useCallback(async (widgetData: WidgetData) => {
    const { id_widget } = widgetData;
    await ProjectService.deleteWidget_Project(id_project, id_widget,
      async () => {
        ProjectService.deleteMedia_Widget(id_project, widgetData);
        CacheService.removeFromAllWidgets_Project(id_widget);
        await SyncService.syncData_ProjectWidgets(id_project, id_widget, 'deletion');
        refresh(prev => !prev);
      },
      (errorMessage) => alert(errorMessage)
    );
  }, [id_project]);

  const AllWidgets = CacheService.allWidgets_Project.map(widgetData => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'project',
        id_project: id_project,
      }}
      widgetData={widgetData}
      referenceGPSData={undefined}
      onDeleteWidget={async () => await onDeleteWidget_Project(widgetData)}
    />
  ));

  return (
    <Layout.ScrollView
      contentContainerStyle={{
        paddingTop: 55,
        paddingBottom: 150,
        paddingHorizontal: 5,
        gap: 10,
      }}
    >
      <ProjectSettingsWidget
        onProjectNameUpdate={(newName) => props.onProjectNameUpdate(newName)}
        onSampleAliasChange_Plural={(newSampleAlias) => props.onSampleAliasChange_Plural(newSampleAlias)}
      />
      {AllWidgets}
    </Layout.ScrollView>
  );
}
