import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Widget } from '@Components/Widget';

import { WidgetData } from '@Types/index';

import ProjectService from '@Services/ProjectService';

export default function Widgets_Sample() {

  const { id_project, id_sample } = useLocalSearchParams();
  const [_, refresh] = useState<boolean>(false);

  async function onConfirm(widgetData: WidgetData) {
    await ProjectService.updateWidget_Sample(
      id_project as string,
      id_sample as string,
      widgetData,
      () => {},
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  async function onDelete(widgetData: WidgetData) {
    const { id_widget } = widgetData;
    await ProjectService.deleteWidget_Sample(
      id_project as string,
      id_sample as string,
      id_widget,
      () => {
        refresh(prev => !prev);
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  async function onCreateWidget(widgetData: WidgetData) {
    await ProjectService.createWidget_Sample(
      id_project as string,
      id_sample as string,
      widgetData,
      () => {
        refresh(prev => !prev);
      },
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  const allWidgetsComponents: JSX.Element[] = ProjectService.allWidgets_Sample.map(widgetData => {
    return (
      <Widget.Selector
        key={widgetData.id_widget}
        widgetData={widgetData}
        onConfirm={async (widgetData) => await onConfirm(widgetData)}
        onDelete={async () => await onDelete(widgetData)}
      />
    );
  });

  return (
    <>
      {allWidgetsComponents}
      <Widget.AddWidgetButton
        onCreateWidget={async (widgetData) => await onCreateWidget(widgetData)}
      />
    </>
  );
}
