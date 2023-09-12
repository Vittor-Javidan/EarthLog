import React, { useMemo, useState } from 'react';

import { BooleanWidgetData, GPS_DTO, WidgetAlertMessage } from '@Types/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Components/Layout';
import { WC } from '../_WC_';
import { TC } from './__TC__';
import UtilService from '@Services/UtilService';

export default function BooleanWidget(props: {
  widgetData: BooleanWidgetData
  statusFeedback?: JSX.Element
  alertMessages?: WidgetAlertMessage
  onConfirm: (widgetData: BooleanWidgetData) => void
  onDelete: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  const [widgetData,  setWidgetData ] = useState<BooleanWidgetData>(UtilService.deepCopy(props.widgetData));
  const [showGPS,     setShowGPS    ] = useState<boolean>(props.widgetData.gps !== undefined);
  const [showModal,   setShowModal  ] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function onConfirm_Modal(widgetData: BooleanWidgetData) {
    setWidgetData(UtilService.deepCopy(widgetData));
    setShowGPS( widgetData.gps !== undefined);
    setShowModal(false);
    setIsDataWrong(false);
    props.onConfirm(widgetData);
  }

  function onSwitchChange(boolean: boolean) {
    const newWidgetData: BooleanWidgetData = { ...widgetData, value: boolean };
    setWidgetData(newWidgetData);
    props.onConfirm(UtilService.deepCopy(newWidgetData));
  }

  function onNotApplicableChange(boolean: boolean) {
    const newWidgetData: BooleanWidgetData = { ...widgetData, notApplicable: boolean };
    setWidgetData(newWidgetData);
    props.onConfirm(UtilService.deepCopy(newWidgetData));
  }

  function onGPSCreate() {
    setShowGPS(true);
    setWidgetData(prev => ({ ...prev, gps: {} }));
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData: BooleanWidgetData = { ...widgetData, gps: newGPSData };
    setWidgetData(newWidgetData);
    props.onConfirm(UtilService.deepCopy(newWidgetData));
  }

  function onDeleteGPS() {
    if (widgetData.gps !== undefined) {
      const newWidgetData: BooleanWidgetData = { ...widgetData };
      delete newWidgetData.gps;
      setWidgetData(newWidgetData);
      setShowGPS(false);
      props.onConfirm(UtilService.deepCopy(newWidgetData));
    }
  }

  return (<>
    <WC.Root

      label={widgetData.name}
      isDataWrong={isDataWrong}
      showModal={showModal}
      statusFeedback={props.statusFeedback}
      alertMessages={props.alertMessages}

      iconButtons={
        <TC.IconButtons
          widgetData={widgetData}
          showGPS={showGPS}
          onPencilPress={() => setShowModal(true)}
          onGPSPress={() => onGPSCreate()}
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
      <Layout.Input.Boolean
        label=""
        backgroundColor={theme.tertiary}
        color={theme.onTertiary}
        value={widgetData.value}
        notApplicable={widgetData.notApplicable}
        locked={!widgetData.rules.allowValueChange}
        onSwitchChange={(boolean) => onSwitchChange(boolean)}
        onNotApplicableChange={(boolean) => onNotApplicableChange(boolean)}
      />
      {showGPS && widgetData.gps !== undefined && (
        <Layout.Input.GPS
          label="GPS"
          gpsData={widgetData.gps}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          onPress_Delete={() => onDeleteGPS()}
          onPress_Save={(newGPSData) => onSaveGPS(newGPSData)}
        />
      )}
    </WC.Root>
  </>);
}

