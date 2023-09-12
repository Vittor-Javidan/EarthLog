import React, { useState } from 'react';

import { WidgetData } from '@Types/index';

import { Widget } from '@Components/Widget';
import { API } from '../__API__';

export default function ProjectWidgets() {

  const [_, refresh] = useState<boolean>(false);
  API.ProjectWidgets.setterRegister_ProjectWidgets(refresh);

  function onConfirm(widgetData: WidgetData) {
    API.ProjectWidgets.updateProjectWidget(widgetData);
  }

  function onDelete(widgetData: WidgetData) {
    API.ProjectWidgets.deleteProjectWidget(widgetData);
    refresh(prev => !prev);
  }

  const allWidgetsComponents: JSX.Element[] = API.TemporaryProject.project.projectWidgets.map(widgetData => {
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
