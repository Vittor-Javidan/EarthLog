import React, { useMemo, useState } from 'react';

import { GPSWidgetData, GPS_DTO, WidgetAlertMessage } from '@Types/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';
import { WC } from '../_WC_';
import { TC } from './__TC__';

export default function GPSWidget(props: {
  widgetData: GPSWidgetData
  statusFeedback?: JSX.Element
  alertMessages?: WidgetAlertMessage
  onConfirm: (widgetData: GPSWidgetData) => void
  onDelete: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  const [widgetData, setWidgetData] = useState<GPSWidgetData>(UtilService.deepCopy(props.widgetData));
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function onConfirm_Modal(widgetData: GPSWidgetData) {
    setWidgetData(UtilService.deepCopy(widgetData));
    setShowModal(false);
    setIsDataWrong(false);
    props.onConfirm(widgetData);
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData: GPSWidgetData = { ...widgetData, gps: newGPSData };
    setWidgetData(newWidgetData);
    props.onConfirm(UtilService.deepCopy(newWidgetData));
  }

  function onDeleteGPS() {
    const newWidgetData: GPSWidgetData = { ...widgetData, gps: {} };
    setWidgetData(newWidgetData);
    props.onConfirm(UtilService.deepCopy(newWidgetData));
  }

  return (
    <WC.Root

      label={widgetData.name}
      isDataWrong={isDataWrong}
      showModal={showModal}
      statusFeedback={props.statusFeedback}
      alertMessages={props.alertMessages}

      iconButtons={
        <TC.IconButtons
          widgetData={widgetData}
          onPencilPress={() => setShowModal(true)}
        />
      }

      modal={
        <TC.Modal
          widgetData={widgetData}
          onConfirm={(widgetData) => onConfirm_Modal(widgetData)}
          onDelete={() => props.onDelete()}
          onRequestClose={() => setShowModal(false)}
        />
      }
    >
      <Layout.Input.GPS
        label=""
        gpsData={widgetData.gps}
        backgroundColor={theme.tertiary}
        color={theme.onTertiary}
        onPress_Delete={() => onDeleteGPS()}
        onPress_Save={(newGPSData) => onSaveGPS(newGPSData)}
      />
    </WC.Root>
  );
}
