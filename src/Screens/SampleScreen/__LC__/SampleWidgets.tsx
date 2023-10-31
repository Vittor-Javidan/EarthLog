import React, { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { GPS_DTO, WidgetData } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';
import MediaService from '@Services/MediaService';

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

  const onDeleteWidget_Sample = useCallback(async (widgetData: WidgetData) => {
    const { id_widget } = widgetData;
    await ProjectService.deleteWidget({
      path: 'sample widgets',
      id_project: id_project,
      id_sample: id_sample,
      widgetData: widgetData,
      sync: true,
    }, async () => {
      await MediaService.deleteMedia({
        scope: 'widget',
        id_project: id_project,
        widget: widgetData,
      });
      CacheService.removeFromAllWidgets_Sample(id_widget);
      refresh(prev => !prev);
    },
    (errorMessage) => alert(errorMessage));
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
      onDeleteWidget={async () => await onDeleteWidget_Sample(widgetData)}
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
