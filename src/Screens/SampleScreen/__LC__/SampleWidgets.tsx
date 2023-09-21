import React, { useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { WidgetData } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';

export default function SampleWidgets() {

  const [_, refresh] = useState<boolean>(false);

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Sample.map(widgetData => {
    return (
      <WidgetUnit
        key={widgetData.id_widget}
        widgetData={widgetData}
        onDelete={() => refresh(prev => !prev)}
      />
    );
  });

  return (<>
    {allWidgetsComponents}
  </>);
}

function WidgetUnit(props: {
  widgetData: WidgetData,
  onDelete: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;
  const id_sample = useLocalSearchParams().id_sample as string;
  const sampleSettings = useMemo(() => CacheService.getSampleFromCache(id_sample), []);

  async function onDelete(id_widget: string) {
    await ProjectService.deleteWidget_Sample(
      id_project,
      id_sample,
      id_widget,
      async () => {
        await CacheService.loadAllWidgets_Sample(id_project, id_sample);
        props.onDelete();
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  return (
    <Widget
      widgetScope={{
        type: 'sample',
        id_project: id_project,
        id_sample: id_sample,
      }}
      widgetData={props.widgetData}
      referenceGPSData={sampleSettings.gps}
      onDelete={async () => await onDelete(props.widgetData.id_widget)}
    />
  );
}
