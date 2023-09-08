import React, { useMemo } from 'react';
import TextWidget from './TextWidget';
import BooleanWidget from './BooleanWidget';
import GPSWidget from './GPSWidget';

import { GPS_DTO, WidgetAlertMessage, WidgetData } from '@Types/index';
import GPSService from '@Services/GPSService';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

export default function WidgetSelector(props: {
  widgetData: WidgetData
  statusFeedback?: JSX.Element
  gpsReference?: GPS_DTO
  onConfirm: (widgetData: WidgetData) => void
  onDelete: () => void
}) {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.WidgetSelector[language], []);

  const alertMessages: WidgetAlertMessage = {};

  GPSService.checkReferenceCoordinateDifference(props.gpsReference, props.widgetData, (distance) => {
    alertMessages.gpsDistanceAlertMessage =  R['* Reference distance: '] + `${distance}m`;
  });

  switch (props.widgetData.type) {
    case 'text': return (
      <TextWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        alertMessages={alertMessages}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
    case 'boolean': return (
      <BooleanWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        alertMessages={alertMessages}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
    case 'gps': return (
      <GPSWidget
        widgetData={props.widgetData}
        statusFeedback={props.statusFeedback}
        alertMessages={alertMessages}
        onConfirm={props.onConfirm}
        onDelete={props.onDelete}
      />
    );
  }
}
