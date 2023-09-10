import React, { useMemo, useState } from 'react';

import { GPSWidgetData, GPS_DTO, WidgetAlertMessage } from '@Types/index';
import ConfigService from '@Services/ConfigService';

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

  const [state, setState] = useState({
    widgetData: props.widgetData,
    showModal: false,
    isDataWrong: false,
  });

  function onConfirm_Modal(widgetData: GPSWidgetData) {
    setState(prev => ({
      ...prev,
      widgetData: widgetData,
      showModal: false,
      isDataWrong: false,
    }));
    props.onConfirm(widgetData);
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData: GPSWidgetData = { ...state.widgetData, gps: newGPSData };
    setState(prev => ({
      ...prev,
      widgetData: newWidgetData,
    }));
    props.onConfirm(newWidgetData);
  }

  function onDeleteGPS() {
    const newWidgetData: GPSWidgetData = { ...state.widgetData, gps: {} };
    setState(prev => ({
      ...prev,
      widgetData: newWidgetData,
    }));
    props.onConfirm(newWidgetData);
  }

  function openModal() {
    setState(prev => ({
      ...prev,
      showModal: true,
    }));
  }

  function closeModal() {
    setState(prev => ({
      ...prev,
      showModal: false,
    }));
  }

  return (
    <WC.Root

      label={state.widgetData.name}
      isDataWrong={state.isDataWrong}
      showModal={state.showModal}
      statusFeedback={props.statusFeedback}
      alertMessages={props.alertMessages}

      iconButtons={
        <TC.IconButtons
          widgetData={state.widgetData}
          onPencilPress={() => openModal()}
        />
      }

      modal={
        <TC.Modal
          widgetData={state.widgetData}
          onConfirm={(widgetData) => onConfirm_Modal(widgetData)}
          onDelete={() => props.onDelete()}
          onRequestClose={() => closeModal()}
        />
      }
    >
      <Layout.Input.GPS
        label=""
        gpsData={state.widgetData.gps}
        backgroundColor={theme.tertiary}
        color={theme.onTertiary}
        onPress_Delete={() => onDeleteGPS()}
        onPress_Save={(newGPSData) => onSaveGPS(newGPSData)}
      />
    </WC.Root>
  );
}
