import React, { memo, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';

import { ProjectRules, WidgetData } from '@V1/Types/ProjectTypes';
import { ProjectService } from '@V1/Services/ProjectService';
import { CacheService } from '@V1/Services/CacheService';

import { Layout } from '@V1/Layout/index';
import { Widget } from '@V1/Widget/index';
import { TC } from './__TC__';

export const Screen_TemplateWidgets = memo((props: {
  id_project: string
  projectRules: ProjectRules
}) => {

  const { id_project, projectRules } = props
  const [templateWidgets, setTemplateWidgets] = useState<WidgetData[]>(CacheService.allWidgets_Template);

  const AllWidgets = templateWidgets.map((widgetData, index) => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'template',
        id_project: props.id_project,
      }}
      widgetData={widgetData}
      referenceGPSData={undefined}
      onDeleteWidget={() => onWidgetDelete(index)}
    />
  ));

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
        onCreateWidget={async () => await onCreateWidget()}
        projectRules={projectRules}
      />}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingHorizontal: 5,
          paddingBottom: Dimensions.get('screen').height - 280,
          gap: 10,
        }}
      >
        {AllWidgets}
      </Layout.ScrollView>
    </Layout.Screen>
  );
});
