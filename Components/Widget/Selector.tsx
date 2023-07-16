import React from 'react';
import { WidgetData, WidgetLabel } from '@Services/ProjectService';
import TextWidget from './TextWidget';
import BooleanWidget from './BooleanWidget';

export default function WidgetSelector(props: {
  label: string
  widgetData: WidgetData
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (newLabel: string, value: WidgetData) => void
}) {

  switch (props.widgetData.type) {
    case 'string': return (
      <TextWidget
        label={props.label}
        widgetData={props.widgetData}
        widgets={props.widgets}
        onConfirm={props.onConfirm}
      />
    );
    case 'boolean': return (
      <BooleanWidget
        label={props.label}
        widgetData={props.widgetData}
        widgets={props.widgets}
        onConfirm={props.onConfirm}
      />
    );
  }
}
