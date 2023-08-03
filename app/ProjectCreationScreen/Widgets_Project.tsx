import React, { useState } from 'react';
import { Widget } from '@Components/Widget';

import { WidgetData } from '@Types/index';

import API_ProjectCreation from './API_ProjectCreation';

export default function Widgets_Project() {

  const [_, refresh] = useState<boolean>(false);

  function onConfirm(widgetData: WidgetData) {
    API_ProjectCreation.updateProjectWidget(widgetData);
  }

  function onDelete(widgetData: WidgetData) {
    API_ProjectCreation.deleteProjectWidget(widgetData);
    refresh(prev => !prev);
  }

  function onCreateWidget(widgetData: WidgetData) {
    API_ProjectCreation.addProjectWidget(widgetData);
    refresh(prev => !prev);
  }

  const allWidgetsComponents: JSX.Element[] = API_ProjectCreation.temporaryProject.projectWidgets.map(widgetData => {
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
    <Widget.AddWidgetButton
      onCreateWidget={(widgetData) => onCreateWidget(widgetData)}
    />
  </>);
}
