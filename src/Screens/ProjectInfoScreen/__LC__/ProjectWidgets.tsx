import React, { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';

export function F_ProjectWidgets() {

  const id_project = useLocalSearchParams().id_project as string;
  const [_, refresh] = useState<boolean>(true);

  const onDeleteWidget_Project = useCallback(async (id_widget: string) => {
    await ProjectService.deleteWidget_Project(
      id_project,
      id_widget,
      async () => {
        await CacheService.loadAllWidgets_Project(id_project);
        refresh(prev => !prev);
      },
      (errorMessage) => alert(errorMessage)
    );
  }, [id_project]);

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Project.map(widgetData => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'project',
        id_project: id_project,
      }}
      widgetData={widgetData}
      referenceGPSData={undefined}
      onDeleteWidget={async () => await onDeleteWidget_Project(widgetData.id_widget)}
    />
  ));

  return (<>{allWidgetsComponents}</>);
}
