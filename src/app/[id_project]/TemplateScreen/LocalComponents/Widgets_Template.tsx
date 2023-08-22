import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Widget } from '@Components/Widget';
import { WidgetData } from '@Types/index';
import ProjectService from '@Services/ProjectService';

import API_Widgets_Template from './API_Widgets_Template';
import CacheService from '@Services/CacheService';

export default function Widgets_Template() {

  const id_project = useLocalSearchParams().id_project as string;

  const [_, refresh] = useState<boolean>(false);
  API_Widgets_Template.setterRegister(refresh);

  async function onConfirm(widgetData: WidgetData) {
    await ProjectService.updateWidget_Template(
      id_project,
      widgetData,
      async () => {
        await CacheService.loadAllWidgets_Template(id_project);
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  async function onDelete(widgetData: WidgetData) {
    await ProjectService.deleteWidget_Template(
      id_project,
      widgetData.id_widget,
      async () => {
        await CacheService.loadAllWidgets_Template(id_project);
        refresh(prev => !prev);
      },
      (errorMessage) => alert(errorMessage)
    );
  }

  const allWidgetsComponents: JSX.Element[] = CacheService.allWidgets_Template.map(widgetData => {
    return (
      <Widget.Selector
        key={widgetData.id_widget}
        widgetData={widgetData}
        onConfirm={async (widgetData) => { await onConfirm(widgetData);}}
        onDelete={async () => await onDelete(widgetData)}
      />
    );
  });

  return (<>
    {allWidgetsComponents}
  </>);
}
