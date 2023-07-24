import React from 'react';
import { WidgetData } from '@Services/ProjectService';
import TextWidget from './TextWidget';
import BooleanWidget from './BooleanWidget';

export default function WidgetSelector(props: {
  widgetData: WidgetData
  onConfirm: (widgetData: WidgetData) => void
  onDelete: () => void
}) {

  switch (props.widgetData.type) {
    case 'text': return (
      <TextWidget
        widgetData={props.widgetData}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
    case 'boolean': return (
      <BooleanWidget
        widgetData={props.widgetData}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
  }
}
