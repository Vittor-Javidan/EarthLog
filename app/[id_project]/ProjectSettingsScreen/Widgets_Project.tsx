import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Widget } from '@Components/Widget';

import ProjectService from '@Services/ProjectService';
import { WidgetData } from '@Types/index';

export default function Widgets_Project() {

  const id_project = useLocalSearchParams().id_project as string;

  const [_, refresh] = useState<boolean>(false);

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

  async function onCreate(widgetData: WidgetData) {
    await ProjectService.createWidget_Project(
      id_project,
      widgetData,
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
    <Widget.AddWidgetButton
      onCreateWidget={async (widgetData) => await onCreate(widgetData)}
    />
  </>);
}
