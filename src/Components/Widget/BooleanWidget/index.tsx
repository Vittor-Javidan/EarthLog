import React, { useMemo, useState } from 'react';

import { BooleanWidgetData, GPS_DTO, WidgetAlertMessage } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Components/Layout';
import { WC } from '../_WC_';
import { TC } from './__TC__';

export default function BooleanWidget(props: {
  widgetData: BooleanWidgetData
  statusFeedback?: JSX.Element
  alertMessages?: WidgetAlertMessage
  onConfirm: (widgetData: BooleanWidgetData) => void
  onDelete: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [state, setState] = useState({
    widgetData: props.widgetData,
    showGPS: props.widgetData.gps !== undefined,
    showModal: false,
    isDataWrong: false,
  });

  function onConfirm_Modal(widgetData: BooleanWidgetData) {
    setState(prev => ({
      ...prev,
      widgetData: widgetData,
      showGPS: widgetData.gps !== undefined,
      showModal: false,
      isDataWrong: false,
    }));
    props.onConfirm(widgetData);
  }

  function onSwitchChange(boolean: boolean) {
    const newWidgetData: BooleanWidgetData = { ...state.widgetData, value: boolean };
    setState(prev => ({
      ...prev,
      widgetData: newWidgetData,
    }));
    props.onConfirm(newWidgetData);
  }

  function onNotApplicableChange(boolean: boolean) {
    const newWidgetData: BooleanWidgetData = { ...state.widgetData, notApplicable: boolean };
    setState(prev => ({
      ...prev,
      widgetData: newWidgetData,
    }));
    props.onConfirm(newWidgetData);
  }

  function onGPSCreate() {
    setState(prev => ({
      ...prev,
      showGPS: true,
      widgetData: { ...prev.widgetData, gps: {}},
    }));
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData: BooleanWidgetData = { ...state.widgetData, gps: newGPSData };
    setState(prev => ({
      ...prev,
      widgetData: newWidgetData,
    }));
    props.onConfirm(newWidgetData);
  }

  function onDeleteGPS() {
    if (state.widgetData.gps === undefined) {
      return;
    }
    const newWidgetData: BooleanWidgetData = { ...state.widgetData };
    delete newWidgetData.gps;
    setState(prev => ({
      ...prev,
      widgetData: newWidgetData,
      showGPS: false,
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

  return (<>
    <WC.Root

      label={state.widgetData.name}
      isDataWrong={state.isDataWrong}
      showModal={state.showModal}
      statusFeedback={props.statusFeedback}
      alertMessages={props.alertMessages}

      iconButtons={
        <TC.IconButtons
          widgetData={state.widgetData}
          showGPS={state.showGPS}
          onPencilPress={() => openModal()}
          onGPSPress={() => onGPSCreate()}
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
      <Layout.Input.Boolean
        label=""
        backgroundColor={theme.tertiary}
        color={theme.onTertiary}
        value={state.widgetData.value}
        notApplicable={state.widgetData.notApplicable}
        locked={!state.widgetData.rules.allowValueChange}
        onSwitchChange={(boolean) => onSwitchChange(boolean)}
        onNotApplicableChange={(boolean) => onNotApplicableChange(boolean)}
      />
      {state.showGPS && state.widgetData.gps !== undefined && (
        <Layout.Input.GPS
          label="GPS"
          gpsData={state.widgetData.gps}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          onPress_Delete={() => onDeleteGPS()}
          onPress_Save={(newGPSData) => onSaveGPS(newGPSData)}
        />
      )}
    </WC.Root>
  </>);
}

