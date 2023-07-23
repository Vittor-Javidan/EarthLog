import { WidgetData, WidgetLabel } from '@Services/ProjectService';
import React from 'react';

import { Widget } from '@Components/Widget';
import AddWidgetButton from './AddWidgetButton';

export default function WidgetsGroup(props: {
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (oldlabel: WidgetLabel, newLabel: WidgetLabel, value: WidgetData) => void
  onDelete: (label: WidgetLabel) => void
  onCreateWidget: (widgetData: WidgetData) => void
}) {

  const allWidgetsComponents: JSX.Element[] = [];
  for (const key in props.widgets) {
    const widgetData = props.widgets[key];
    allWidgetsComponents.push(
      <Widget.Selector
        key={key}
        label={key}
        widgetData={widgetData}
        widgets={props.widgets}
        onConfirm={(newLabel, value) => { props.onConfirm(key, newLabel, value);}}
        onDelete={() => props.onDelete(key)}
      />
    );
  }

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
