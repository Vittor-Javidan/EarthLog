import React, { useState, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';

export function F_TemplateWidgets() {

  const id_project = useLocalSearchParams().id_project as string;
  const [_, refresh] = useState<boolean>(false);



  const onDeleteWidget_Template = useCallback(async (id_widget: string) => {

    const projectSettings = CacheService.getProjectFromCache(id_project);
    if (projectSettings.status !== 'new') {

      // Template widget deletion entry =============
      projectSettings.deleted_TemplateWidgets ??= [];
      projectSettings.deleted_TemplateWidgets.push(id_widget);

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

    // Template widget deletion =====================================
    await ProjectService.deleteWidget_Template(id_project, id_widget,
      () => CacheService.removeFromAllWidgets_Template(id_widget),
      (errorMessage) => alert(errorMessage)
    );

    refresh(prev => !prev);

  }, [id_project]);



  const AllWidgets = CacheService.allWidgets_Template.map(widgetData => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'template',
        id_project: id_project,
      }}
      widgetData={widgetData}
      referenceGPSData={undefined}
      onDeleteWidget={async () => await onDeleteWidget_Template(widgetData.id_widget)}
    />
  ));

  return (<>{AllWidgets}</>);
}
