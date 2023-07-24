import { WidgetData } from '@Services/ProjectService';
import React from 'react';

import { Widget } from '@Components/Widget';
import AddWidgetButton from './AddWidgetButton';

export default function WidgetsGroup(props: {
  widgets: WidgetData[]
  onConfirm: (widgetData: WidgetData) => void
  onDelete: (widgetData: WidgetData) => void
  onCreateWidget: (widgetData: WidgetData) => void
}) {

  const allWidgetsComponents: JSX.Element[] = props.widgets.map(widgetData => {
    return (
      <Widget.Selector
        key={widgetData.id_widget}
        widgetData={widgetData}
        onConfirm={(widgetData) => { props.onConfirm(widgetData);}}
        onDelete={() => props.onDelete(widgetData)}
      />
    );
  });

  return (
    <>
      {allWidgetsComponents}
      <AddWidgetButton
        widgets={props.widgets}
        onCreateWidget={(widgetData) => props.onCreateWidget(widgetData)}
      />
    </>
  );
}
