import { WidgetData, WidgetLabel } from '@Services/ProjectService';
import React from 'react';

import { Widget } from '@Components/Widget';
import AddWidgetButton from './AddWidgetButton';

export default function WidgetsGroup(props: {
  refreshSetterKey: string
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (oldlabel: string, newLabel: string, value: WidgetData) => void
  onCreateWidget: (label: WidgetLabel, widgetData: WidgetData) => void
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
        onConfirm={(newLabel, value) => {
          props.onConfirm(key, newLabel, value);
        }}
      />
    );
  }

  return (
    <>
      {allWidgetsComponents}
      <AddWidgetButton
        widgets={props.widgets}
        onCreateWidget={(label, widgetData) => props.onCreateWidget(label, widgetData)}
      />
    </>
  );
}
