import React from 'react';
import TextWidget from './TextWidget';
import BooleanWidget from './BooleanWidget';

import { WidgetData } from '@Types/index';

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
