import React, { memo } from 'react';

import { GPS_DTO, WidgetData } from '@V1/Types/ProjectTypes';

import { Widget } from '@V1/Widget/index';

export const SampleWidgets = memo((props: {
  id_project: string
  id_sample: string
  referenceGPS: GPS_DTO | undefined
  sampleWidgets: WidgetData[]
  onDeleteWidget: (index: number) => void
}) => {

  const AllWidgets = props.sampleWidgets.map((widgetData, index) => (
    <Widget
      key={widgetData.id_widget}
      widgetScope={{
        type: 'sample',
        id_project: props.id_project,
        id_sample: props.id_sample,
      }}
      widgetData={widgetData}
      referenceGPSData={props.referenceGPS}
      onDeleteWidget={() => props.onDeleteWidget(index)}
    />
  ));

  return (<>{AllWidgets}</>);
});
