import React, { useMemo, useState } from 'react';

import { GPS_DTO, TextWidgetData, WidgetAlertMessage } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';
import { WidgetRules } from '../Rules';

import { Layout } from '@Components/Layout';
import { WidgetComponent } from '@WidgetComponents/index';
import Modal from './Modal';

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

  function isDataValid(widgetData: TextWidgetData) {

    if (WidgetRules.noSpaces(widgetData)) {
      alert(R['Value cannot have empty spaces.']);
      return false;
    }

    if (WidgetRules.noSpecialLetters(widgetData)) {
      alert(R['only numbers, and letter from "a" to "z" or "A" to "Z" is allow.']);
      return false;
    }

    return true;
  }

  function onConfirm_Modal(widgetData: TextWidgetData) {
    if (isDataValid(widgetData)) {
      setState(({
        widgetData: widgetData,
        showModal: false,
        showGPS: widgetData.gps !== undefined,
        isDataWrong: false,
      }));
      props.onConfirm(widgetData);
    } else {
      setState(({
        widgetData: widgetData,
        showModal: false,
        showGPS: widgetData.gps !== undefined,
        isDataWrong: true,
      }));
    }
  }

  function onTextChange(text: string) {
    const newWidgetData = { ...state.widgetData, value: text };
    if (isDataValid(newWidgetData)) {
      setState(prev => ({
        ...prev,
        widgetData: newWidgetData,
        isDataWrong: false,
      }));
      props.onConfirm(newWidgetData);
    } else {
      setState(prev => ({
        ...prev,
        widgetData: newWidgetData,
        isDataWrong: true,
      }));
    }
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

  function createGPS() {
    setState(prev => ({
      ...prev,
      widgetData: { ...prev.widgetData, gps: {}},
      showGPS: true,
    }));
  }

  return (
    <WidgetComponent.Root

      label={state.widgetData.name}
      isDataWrong={state.isDataWrong}
      showModal={state.showModal}
      statusFeedback={props.statusFeedback}
      alertMessages={props.alertMessages}

      iconButtons_Top={
        <IconButtons_Top
          widgetData={state.widgetData}
          showGPS={state.showGPS}
          onPencilPress={() => openModal()}
          onGPSPress={() => createGPS()}
        />
      }

      modal={
        <Modal
          widgetData={state.widgetData}
          onConfirm={(widgetData) => onConfirm_Modal(widgetData)}
          onDelete={() => props.onDelete()}
          onRequestClose={() => closeModal()}
        />
      }
    >
      <Layout.View
        style={{
          paddingVertical: 5,
          gap: 10,
        }}
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
      </Layout.View>
    </WidgetComponent.Root>
  );
}

function IconButtons_Top(props: {
  widgetData: TextWidgetData
  showGPS: boolean
  onPencilPress: () => void
  onGPSPress: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
    {!props.showGPS && (
      <Layout.Button.Icon
        iconName="location"
        color_background={theme.secondary}
        color={theme.onSecondary}
        onPress={() => props.onGPSPress()}
        style={{
          height: 40,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      />
    )}
    {(props.widgetData.rules.allowLabelChange || props.widgetData.rules.allowValueChange) && (
      <Layout.Button.Icon
        iconName="pencil-sharp"
        color={theme.onSecondary}
        onPress={props.onPencilPress}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderTopRightRadius: 10,
        }}
      />
    )}
  </>);
}
