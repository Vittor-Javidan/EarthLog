import React, { memo, useCallback, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { WidgetData } from '@V1/Types/ProjectTypes';
import ProjectService from '@V1/Services/ProjectService';
import CacheService from '@V1/Services/CacheService';

import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';
import { LC } from './__LC__';

export const TemplateScreen = memo(() => {

  const id_project = useLocalSearchParams().id_project as string;
  const [templateWidgets, setTemplateWidgets] = useState<WidgetData[]>(CacheService.allWidgets_Template);

  const onCreateWidget = useCallback(async () => {
    const newWidget = ProjectService.getWidgetData();
    await ProjectService.createWidget({
      path: 'template widgets',
      id_project: id_project,
      widgetData: newWidget,
      sync: true,
      onSuccess: () => {
        CacheService.addToAllWidgets_Template({ widgetData: newWidget });
        setTemplateWidgets(CacheService.allWidgets_Template);
      },
      onError: (errorMessage) => alert(errorMessage),
    });
  }, [templateWidgets]);

  const onWidgetDelete = useCallback(async (index: number) => {
    const newData: WidgetData[] = [ ...templateWidgets ];
    const removedWidget = newData.splice(index, 1)[0];
    await ProjectService.deleteWidget({
      path: 'template widgets',
      id_project: id_project,
      widgetData: removedWidget,
      sync: true,
      onSuccess: () => {
        CacheService.allWidgets_Template = newData;
        setTemplateWidgets(newData);
      },
      onError: (errorMessage) => alert(errorMessage),
    });
  }, [templateWidgets]);

  return (
    <Layout.Screen
      screenButtons={<TC.ScreenButtons
        onCreateWidget={onCreateWidget}
      />}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingBottom: 150,
          paddingHorizontal: 5,
          gap: 10,
        }}
      >
        <LC.TemplateWidgets
          id_project={id_project}
          templateWidgets={templateWidgets}
          onWidgetDelete={onWidgetDelete}
        />
      </Layout.ScrollView>
    </Layout.Screen>
  );
});
