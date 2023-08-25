import React, { useState } from 'react';

import { Widget } from '@Components/Widget';
import { WidgetData } from '@Types/index';

import API_TemporaryProject from './API_TemporaryProject';
import API_Widgets_Project from './API_Widgets_Project';

export default function Widgets_Project() {

  const [_, refresh] = useState<boolean>(false);
  API_Widgets_Project.setterRegister_ProjectWidgets(refresh);

  function onConfirm(widgetData: WidgetData) {
    API_Widgets_Project.updateProjectWidget(widgetData);
  }

  function onDelete(widgetData: WidgetData) {
    API_Widgets_Project.deleteProjectWidget(widgetData);
    refresh(prev => !prev);
  }

  const allWidgetsComponents: JSX.Element[] = API_TemporaryProject.project.projectWidgets.map(widgetData => {
    return (
      <Widget.Selector
        key={widgetData.id_widget}
        widgetData={widgetData}
        onConfirm={(widgetData) => { onConfirm(widgetData);}}
        onDelete={() => onDelete(widgetData)}
      />
    );
  });

  return (<>
    {allWidgetsComponents}
  </>);
}
