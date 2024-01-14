import React, { memo } from 'react';

import { WidgetData } from '@V2/Types/ProjectTypes';

import { Widget } from '@V2/Widget/index';

export const TemplateWidgets = memo((props: {
  id_project: string
  templateWidgets: WidgetData[],
  onWidgetDelete: (index: number) => void
}) => {

  const AllWidgets = props.templateWidgets.map((widgetData, index) => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'template',
        id_project: props.id_project,
      }}
      widgetData={widgetData}
      referenceGPSData={undefined}
      onDeleteWidget={() => props.onWidgetDelete(index)}
    />
  ));

  return (<>{AllWidgets}</>);
});
