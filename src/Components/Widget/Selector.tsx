import React from 'react';
import TextWidget from './TextWidget';
import BooleanWidget from './BooleanWidget';
import GPSWidget from './GPSWidget';

import { GPS_DTO, WidgetData } from '@Types/index';

export default function WidgetSelector(props: {
  widgetData: WidgetData
  statusFeedback?: JSX.Element
  gpsReference?: GPS_DTO
  onConfirm: (widgetData: WidgetData) => void
  onDelete: () => void
}) {

  // Widge Alert Messages Build Area ===============================================================
  // const alertMessages: WidgetAlertMessage = {};
  // GPSService.checkReferenceCoordinateDifference(props.gpsReference, props.widgetData, (distance) => {
  //   alertMessages.gpsDistanceAlertMessage =  R['* Reference distance: '] + `${distance}m`;
  // });
  // ===============================================================================================

  switch (props.widgetData.type) {
    case 'text': return (
      <TextWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        alertMessages={{}}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
    case 'boolean': return (
      <BooleanWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        alertMessages={{}}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
    case 'gps': return (
      <GPSWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        alertMessages={{}}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
  }
}
