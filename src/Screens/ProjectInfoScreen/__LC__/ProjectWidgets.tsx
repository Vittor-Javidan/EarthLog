import React, { memo } from 'react';

import { WidgetData } from '@Types/ProjectTypes';

import { Widget } from '@Widget/index';

export const ProjectWidgets = memo((props: {
  id_project: string
  projectWidgets: WidgetData[]
  onDeleteWidget: (index: number) => void
}) => {

  const AllWidgets = props.projectWidgets.map((widgetData, index) => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'project',
        id_project: props.id_project,
      }}
      widgetData={widgetData}
      referenceGPSData={undefined}
      onDeleteWidget={() => props.onDeleteWidget(index)}
    />
  ));

  return <>{AllWidgets}</>;
});
