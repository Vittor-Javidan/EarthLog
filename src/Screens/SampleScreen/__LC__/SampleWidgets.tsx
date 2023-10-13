import React, { useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';
import { GPS_DTO } from '@Types/ProjectTypes';

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

    // Project status update ============================================
    const projectSettings = CacheService.getProjectFromCache(id_project);
    if (projectSettings.status === 'uploaded') {
      projectSettings.status = 'modified';
      await ProjectService.updateProject(projectSettings,
        () => CacheService.updateCache_ProjectSettings(projectSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    const sampleSettings = CacheService.getSampleFromCache(id_sample);
    if (sampleSettings.status !== 'new') {

      // Sample Widget deletion entry ======
      sampleSettings.deleted_Widgets ??= [];
      sampleSettings.deleted_Widgets.push(id_widget);

      // Sample status update ===================
      if (sampleSettings.status === 'uploaded') {
        sampleSettings.status = 'modified';
      }

      // Sample settings update ===================================
      await ProjectService.updateSample(id_project, sampleSettings,
        () => CacheService.updateCache_SampleSettings(sampleSettings),
        (erroMessage) => alert(erroMessage)
      );
    }

    // Sample widget deletion ================================================
    await ProjectService.deleteWidget_Sample(id_project, id_sample, id_widget,
      () => CacheService.removeFromAllWidgets_Sample(id_widget),
      (errorMessage) => alert(errorMessage),
    );

    refresh(prev => !prev);

  }, [id_project, id_sample]);



  const allWidgetsComponents = CacheService.allWidgets_Sample.map(widgetData => (
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

  return (<>{allWidgetsComponents}</>);
}
