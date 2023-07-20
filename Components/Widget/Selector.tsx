import React from 'react';
import { WidgetData, WidgetLabel } from '@Services/ProjectService';
import TextWidget from './TextWidget';
import BooleanWidget from './BooleanWidget';

export default function WidgetSelector(props: {
  label: string
  widgetData: WidgetData
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (newLabel: string, value: WidgetData) => void
  onDelete: () => void
}) {

  switch (props.widgetData.type) {
    case 'text': return (
      <TextWidget
        label={props.label}
        widgetData={props.widgetData}
        widgets={props.widgets}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
    case 'boolean': return (
      <BooleanWidget
        label={props.label}
        widgetData={props.widgetData}
        widgets={props.widgets}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
  }
}