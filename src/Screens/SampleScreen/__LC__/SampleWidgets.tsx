import React, { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { GPS_DTO } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import SyncService from '@Services/SyncService';

import { Widget } from '@Widget/index';
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

  const AllWidgets = CacheService.allWidgets_Sample.map(widgetData => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'sample',
        id_project: id_project,
        id_sample: id_sample,
      }}
      widgetData={widgetData}
      referenceGPSData={props.referenceGPS}
      onDeleteWidget={async () => await onDeleteWidget_Sample(widgetData.id_widget)}
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
      {AllWidgets}
    </Layout.ScrollView>
  );
}
