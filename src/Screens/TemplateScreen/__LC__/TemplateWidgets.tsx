import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { WidgetData } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';

export default function TemplateWidgets() {

  const [_, refresh] = useState<boolean>(false);

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Template.map(widgetData => {
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

  async function onDelete(id_widget: string) {
    await ProjectService.deleteWidget_Template(
      id_project,
      id_widget,
      async () => {
        await CacheService.loadAllWidgets_Template(id_project);
        props.onDelete();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Widget
      widgetScope={{
        type: 'template',
        id_project: id_project,
      }}
      widgetData={props.widgetData}
      referenceGPSData={undefined}
      onDelete={async () => await onDelete(props.widgetData.id_widget)}
    />
  );
}
