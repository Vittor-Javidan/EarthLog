import React, { useCallback, useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';

export default function SampleWidgets() {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample  = useLocalSearchParams().id_sample as string;
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);
  const [_, refresher] = useState<boolean>(false);

  const onDeleteWidget_Sample = useCallback(async (id_widget: string) => {
    await ProjectService.deleteWidget_Sample(
      id_project,
      id_sample,
      id_widget,
      async () => {
        await CacheService.loadAllWidgets_Sample(id_project, id_sample);
        refresher(prev => !prev);
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }, [id_project, id_sample]);

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Sample.map(widgetData => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'sample',
        id_project: id_project,
        id_sample: id_sample,
      }}
      widgetData={widgetData}
      referenceGPSData={sampleSettings.gps}
      onDeleteWidget={async () => await onDeleteWidget_Sample(widgetData.id_widget)}
    />
  ));

  return (<>{allWidgetsComponents}</>);
}
