import React, { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';

export function F_ProjectWidgets() {

  const id_project = useLocalSearchParams().id_project as string;
  const [_, refresh] = useState<boolean>(true);



  const onDeleteWidget_Project = useCallback(async (id_widget: string) => {

    const projectSettings = CacheService.getProjectFromCache(id_project);
    if (projectSettings.status !== 'new') {

      // Project widget deletion entry =============
      projectSettings.deleted_ProjectWidgets ??= [];
      projectSettings.deleted_ProjectWidgets.push(id_widget);

      // Project status update ===================
      if (projectSettings.status === 'uploaded') {
        projectSettings.status = 'modified';
      }

      // Project settings update ========================
      await ProjectService.updateProject(projectSettings,
        () => CacheService.updateCache_ProjectSettings(projectSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    // Project widget deletion =====================================
    await ProjectService.deleteWidget_Project(id_project, id_widget,
      () => CacheService.removeFromAllWidgets_Project(id_widget),
      (errorMessage) => alert(errorMessage)
    );

    refresh(prev => !prev);

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
