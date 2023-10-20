import React, { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import SyncService from '@Services/SyncService';

import { Widget } from '@Widget/index';
import { GPS_DTO } from '@Types/ProjectTypes';
import { Layout } from '@Layout/index';

/**
 * @Warning This component uses parent rerender to update its components. Do no use memo hook.
 */
export function F_SampleWidgets(props: {
  referenceGPS: GPS_DTO | undefined
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const [_, refresh] = useState<boolean>(true);

  const onDeleteWidget_Sample = useCallback(async (id_widget: string) => {
    await ProjectService.deleteWidget_Sample(id_project, id_sample, id_widget,
      async () => {
        CacheService.removeFromAllWidgets_Sample(id_widget);
        await SyncService.syncData_SampleWidgets(id_project, id_sample, id_widget, 'deletion');
        refresh(prev => !prev);
      },
      (errorMessage) => alert(errorMessage),
    );
  }, [id_project, id_sample]);

  return (
    <Layout.VirtualizeList
      array={CacheService.allWidgets_Sample}
      keyExtractor={(item) => item.id_widget}
      maxToRenderPerBatch={5}
      renderItem={({ item }) => (

        <Widget
          key={item.id_widget}
          widgetScope={{
            type: 'sample',
            id_project: id_project,
            id_sample: id_sample,
          }}
          widgetData={item}
          referenceGPSData={props.referenceGPS}
          onDeleteWidget={async () => await onDeleteWidget_Sample(item.id_widget)}
        />

      )}
      style={{
        paddingTop: 55,
        paddingBottom: 150,
        paddingHorizontal: 5,
        gap: 10,
      }}
    />
  );
}
