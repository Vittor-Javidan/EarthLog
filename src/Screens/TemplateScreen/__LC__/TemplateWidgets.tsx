import React, { useState, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';

import ProjectService from '@Services/ProjectService';
import CacheService from '@Services/CacheService';

import { Widget } from '@Widget/index';
import { Layout } from '@Layout/index';
import { WidgetData } from '@Types/ProjectTypes';

export function F_TemplateWidgets() {

  const id_project = useLocalSearchParams().id_project as string;
  const [_, refresh] = useState<boolean>(false);

  const onDeleteWidget_Template = useCallback(async (widgetData: WidgetData) => {
    const { id_widget } = widgetData;
    await ProjectService.deleteWidget({
      path: 'template widgets',
      id_project: id_project,
      widgetData: widgetData,
      sync: true,
    }, () => {
      CacheService.removeFromAllWidgets_Template(id_widget);
      refresh(prev => !prev);
    }, (errorMessage) => alert(errorMessage));
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
      onDeleteWidget={async () => await onDeleteWidget_Template(widgetData)}
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
