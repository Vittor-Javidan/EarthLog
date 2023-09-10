import React, { useMemo, useState } from 'react';

import { BooleanWidgetData, GPS_DTO, WidgetAlertMessage } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Components/Layout';
import { WidgetComponent } from '../Components';

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

    if (state.showModal) {
      setState(prev => ({
        ...prev,
        widgetData: widgetData,
        showGPS: widgetData.gps !== undefined,
        showModal: false,
        isDataWrong: false,
      }));
      props.onConfirm(widgetData);
    } else {
      setState(prev => ({
        ...prev,
        showGPS: widgetData.gps !== undefined,
        showModal: false,
      }));
    }
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

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData: BooleanWidgetData = { ...state.widgetData, gps: newGPSData };
    setState(prev => ({
      ...prev,
      widgetData: newWidgetData,
    }));
    props.onConfirm(newWidgetData);
  }

  function onDeleteGPS() {
    if (state.widgetData.gps !== undefined) {
      const newWidgetData: BooleanWidgetData = { ...state.widgetData };
      delete newWidgetData.gps;
      setState(prev => ({
        ...prev,
        widgetData: newWidgetData,
        showGPS: false,
      }));
      props.onConfirm(newWidgetData);
    }
  }

  function onGPSCreate() {
    setState(prev => ({
      ...prev,
      showGPS: true,
      widgetData: { ...prev.widgetData, gps: {}},
    }));
  }

  return (<>
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
          onPencilPress={() => setState(prev => ({ ...prev, showModal: true }))}
          onGPSPress={() => onGPSCreate()}
        />
      }

      modal={
        <Modal
          widgetData={state.widgetData}
          onConfirm={(widgetData) => onConfirm_Modal(widgetData)}
          onDelete={() => props.onDelete()}
          onRequestClose={() => setState(prev => ({ ...prev, showModal: false }))}
        />
      }
    >
      <Layout.View
        style={{
          paddingVertical: 5,
          gap: 10,
        }}
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
      </Layout.View>
    </WidgetComponent.Root>
  </>);
}

function IconButtons_Top(props: {
  widgetData: BooleanWidgetData
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
    {(props.widgetData.rules.allowLabelChange) && (
      <Layout.Button.Icon
        iconName="pencil-sharp"
        color={theme.onSecondary}
        onPress={() => props.onPencilPress()}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderTopRightRadius: 10,
        }}
      />
    )}
  </>);
}

function Modal(props: {
  widgetData: BooleanWidgetData
  onConfirm: (value: BooleanWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.BooleanWidget[language], []);

  const [state, setState] = useState({
    label: props.widgetData.name,
    value: props.widgetData.value,
    notApplicable: props.widgetData.notApplicable,
    gpsData: props.widgetData.gps,
  });

  const { rules } = props.widgetData;

  function onConfirm() {

    const newWidgetData: BooleanWidgetData = {
      id_widget: props.widgetData.id_widget,
      name: state.label,
      type: 'boolean',
      value: state.value,
      rules: { ...props.widgetData.rules },
    };

    if (state.gpsData !== undefined) {
      newWidgetData.gps = state.gpsData;
    }

    props.onConfirm(newWidgetData);
  }

  return (
    <WidgetComponent.Modal
      title={state.label}
      widgetData={props.widgetData}
      onConfirm={() => onConfirm()}
      onDelete={() => props.onDelete()}
      onRequestClose={() => props.onRequestClose()}
    >
      <Layout.View
        style={{
          gap: 10,
        }}
      >
        <Layout.Input.String
          label={R['Widget name']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          color_placeholder={theme.onBackground_Placeholder}
          placeholder={R['Write widget name here...']}
          value={state.label}
          locked={!rules.allowLabelChange}
          onChangeText={(text) => setState(prev => ({ ...prev, label: text }))}
        />
        <Layout.Input.Boolean
          label={R['Value']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          value={state.value}
          notApplicable={state.notApplicable}
          locked={!rules.allowValueChange}
          onSwitchChange={(boolean) => setState(prev => ({ ...prev, value: boolean }))}
          onNotApplicableChange={(boolean) => setState(prev => ({ ...prev, notApplicable: boolean }))}
        />
        {state.gpsData === undefined ? (
          <Layout.View
            style={{
              alignItems: 'flex-end',
              marginHorizontal: 10,
            }}
          >
            <Layout.Button.Icon
              iconName="location"
              color_background={theme.secondary}
              color={theme.onSecondary}
              onPress={() => setState(prev => ({ ...prev, gpsData: {} }))}
              style={{
                borderRadius: 10,
                height: 40,
                width: 80,
              }}
            />
          </Layout.View>
        ) : (
          <Layout.Input.GPS
            label="GPS"
            gpsData={state.gpsData}
            backgroundColor={theme.background}
            color={theme.onBackground}
            onPress_Delete={() => setState(prev => ({ ...prev, gpsData: undefined }))}
            onPress_Save={(newGPSData) => setState(prev => ({ ...prev, gpsData: newGPSData }))}
          />
        )}
      </Layout.View>
    </WidgetComponent.Modal>
  );
}
