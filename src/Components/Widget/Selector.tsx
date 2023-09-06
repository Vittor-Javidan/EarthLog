import React from 'react';
import TextWidget from './TextWidget';
import BooleanWidget from './BooleanWidget';
import GPSWidget from './GPSWidget';

import { WidgetData } from '@Types/index';

export default function WidgetSelector(props: {
  widgetData: WidgetData
  statusFeedback?: JSX.Element
  onConfirm: (widgetData: WidgetData) => void
  onDelete: () => void
}) {

  switch (props.widgetData.type) {
    case 'text': return (
      <TextWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
    case 'boolean': return (
      <BooleanWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
    case 'gps': return (
      <GPSWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
  }
}
