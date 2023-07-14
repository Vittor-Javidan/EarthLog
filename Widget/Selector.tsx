import React from 'react';
import { WidgetData } from '@Services/ProjectService';
import TextWidget from './TextWidget';
import BooleanWidget from './BooleanWidget';

export default function WidgetSelector(props: {
  label: string
  widgetData: WidgetData
  onConfirm: (newLabel: string, value: WidgetData) => void
}) {

  switch (props.widgetData.type) {
    case 'string': return (
      <TextWidget
        label={props.label}
        widgetData={props.widgetData}
        onConfirm={props.onConfirm}
      />
    );
    case 'boolean': return (
      <BooleanWidget
        label={props.label}
        widgetData={props.widgetData}
        onConfirm={props.onConfirm}
      />
    );
  }
}
