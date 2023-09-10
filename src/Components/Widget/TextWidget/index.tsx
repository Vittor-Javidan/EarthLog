import React, { useMemo, useState } from 'react';

import { GPS_DTO, TextWidgetData, WidgetAlertMessage } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';
import { WidgetRules } from '../Rules';

import { Layout } from '@Components/Layout';
import { WC } from '@Components/Widget/_WC_/index';
import { TC } from './__TC__';

export default function TextWidget(props: {
  widgetData: TextWidgetData
  statusFeedback?: JSX.Element
  alertMessages?: WidgetAlertMessage
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [state, setState] = useState({
    widgetData: UtilService.deepCloning(props.widgetData),
    showGPS: props.widgetData.gps !== undefined,
    showModal: false,
    isDataWrong: false,
  });

  function checkRules(
    widgetData: TextWidgetData,
    whenValid: () => void,
    whenInvalid: () => void
  ) {

    if (WidgetRules.noSpaces(widgetData)) {
      alert(R['Value cannot have empty spaces.']);
      whenInvalid();
      return false;
    }

    if (WidgetRules.noSpecialLetters(widgetData)) {
      alert(R['only numbers, and letter from "a" to "z" or "A" to "Z" is allow.']);
      whenInvalid();
      return false;
    }

    whenValid();
  }

  function onConfirm_Modal(widgetData: TextWidgetData) {
    checkRules(widgetData,
      () => {
        setState(({
          widgetData: widgetData,
          showModal: false,
          showGPS: widgetData.gps !== undefined,
          isDataWrong: false,
        }));
        props.onConfirm(widgetData);
      },
      () => {
        setState(({
          widgetData: widgetData,
          showModal: false,
          showGPS: widgetData.gps !== undefined,
          isDataWrong: true,
        }));
      }
    );
  }

  function onTextChange(text: string) {
    const newWidgetData = { ...state.widgetData, value: text };
    checkRules(newWidgetData,
      () => {
        setState(prev => ({
          ...prev,
          widgetData: newWidgetData,
          isDataWrong: false,
        }));
        props.onConfirm(newWidgetData);
      },
      () => {
        setState(prev => ({
          ...prev,
          widgetData: newWidgetData,
          isDataWrong: true,
        }));
      },
    );
  }

  function createGPS() {
    setState(prev => ({
      ...prev,
      widgetData: { ...prev.widgetData, gps: {}},
      showGPS: true,
    }));
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData = { ...state.widgetData, gps: newGPSData };
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
    const newWidgetData = { ...state.widgetData };
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
          showGPS={state.showGPS}
          onPencilPress={() => openModal()}
          onGPSPress={() => createGPS()}
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
      <Layout.Input.String
        label={''}
        value={state.widgetData.value}
        backgroundColor={theme.tertiary}
        color={theme.onTertiary}
        color_placeholder={theme.onTertiary_Placeholder}
        placeholder={R['Write anything here...']}
        locked={false}
        onChangeText={(text) => onTextChange(text)}
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
  );
}
