import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { NewWidgetData } from '@Types/ProjectTypes';
import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';
import { API } from '../__API__';

export default function ProjectWidgets() {

  const [_, refresh] = useState<boolean>(false);
  API.ProjectWidgets.setterRegister(refresh);

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Project.map(widgetData => {
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
  widgetData: NewWidgetData,
  onDelete: () => void
}) {

  const id_project = useLocalSearchParams().id_project as string;

  async function onDelete(id_widget: string) {
    await ProjectService.deleteWidget_Project(
      id_project,
      id_widget,
      async () => {
        await CacheService.loadAllWidgets_Project(id_project);
        props.onDelete();
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  return (
    <Widget
      widgetScope={{
        type: 'project',
        id_project: id_project,
      }}
      widgetData={props.widgetData}
      referenceGPSData={undefined}
      onDelete={async () => await onDelete(props.widgetData.id_widget)}
    />
  );
}
