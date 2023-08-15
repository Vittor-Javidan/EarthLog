import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

import { Widget } from '@Components/Widget';
import ProjectService from '@Services/ProjectService';
import { WidgetData } from '@Types/index';

import API_Widgets_Project from './API_Widgets_Project';

export default function Widgets_Project() {

  const id_project = useLocalSearchParams().id_project as string;

  const [_, refresh] = useState<boolean>(false);
  API_Widgets_Project.setterRegister(refresh);

  async function onConfirm(widgetData: WidgetData) {
    await ProjectService.updateWidget_Project(
      id_project,
      widgetData,
      () => {},
      (errorMessage) => alert(errorMessage)
    );
  }

  async function onDelete(widgetData: WidgetData) {
    await ProjectService.deleteWidget_Project(
      id_project,
      widgetData.id_widget,
      () => refresh(prev => !prev),
      (errorMessage) => alert(errorMessage)
    );
  }

  const allWidgetsComponents: JSX.Element[] = ProjectService.getAllProjectWidgetsFromCache().map(widgetData => {
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
