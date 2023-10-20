import React, { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import SyncService from '@Services/SyncService';

import { Widget } from '@Widget/index';
import { Layout } from '@Layout/index';
import { ProjectSettingsWidget } from './ProjectSettingsWidget';
import { View } from 'react-native';

export function F_ProjectWidgets(props: {
  onProjectNameUpdate: (newName: string) => void
  onSampleAliasChange_Plural: (newSampleAlias: string) => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const [_, refresh] = useState<boolean>(true);

  const onDeleteWidget_Project = useCallback(async (id_widget: string) => {
    await ProjectService.deleteWidget_Project(id_project, id_widget,
      async () => {
        CacheService.removeFromAllWidgets_Project(id_widget);
        await SyncService.syncData_ProjectWidgets(id_project, id_widget, 'deletion');
        refresh(prev => !prev);
      },
      (errorMessage) => alert(errorMessage)
    );
  }, [id_project]);

  return (
    <Layout.VirtualizeList
      array={CacheService.allWidgets_Project}
      keyExtractor={(item) => item.id_widget}
      maxToRenderPerBatch={5}
      style={{
        paddingTop: 55,
        paddingBottom: 150,
        paddingHorizontal: 5,
        gap: 10,
      }}

      header={
        <View>
          <ProjectSettingsWidget
            onProjectNameUpdate={(newName) => props.onProjectNameUpdate(newName)}
            onSampleAliasChange_Plural={(newSampleAlias) => props.onSampleAliasChange_Plural(newSampleAlias)}
          />
        </View>
      }

      renderItem={({ item }) => (

        <Widget
          key={item.id_widget}
          widgetScope={{
            type: 'project',
            id_project: id_project,
          }}
          widgetData={item}
          referenceGPSData={undefined}
          onDeleteWidget={async () => await onDeleteWidget_Project(item.id_widget)}
        />

      )}
    />
  );
}
