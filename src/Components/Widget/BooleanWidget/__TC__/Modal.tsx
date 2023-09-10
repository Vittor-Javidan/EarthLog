import React, { useMemo, useState } from 'react';

import { BooleanWidgetData, GPS_DTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';
import { WC } from '@Components/Widget/_WC_';

type State = {
  label: string,
  value: boolean,
  notApplicable: boolean | undefined,
  gps: GPS_DTO | undefined
}

export default function Modal(props: {
  widgetData: BooleanWidgetData
  onConfirm: (value: BooleanWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.BooleanWidget[language], []);
  const { rules } = props.widgetData;

  const [state, setState] = useState<State>({
    label: props.widgetData.name,
    value: props.widgetData.value,
    notApplicable: props.widgetData.notApplicable,
    gps: props.widgetData.gps !== undefined ? UtilService.deepCloning(props.widgetData.gps) : undefined,
  });


  function onConfirm() {
    const newWidgetData: BooleanWidgetData = {
      id_widget: props.widgetData.id_widget,
      name: state.label,
      type: 'boolean',
      value: state.value,
      rules: { ...props.widgetData.rules },
    };
    if (state.gps !== undefined) {
      newWidgetData.gps = state.gps;
    }
    props.onConfirm(newWidgetData);
  }

  function onLabelChange(text: string) {
    setState(prev => ({ ...prev, label: text }));
  }

  function onValueChange(boolean: boolean) {
    setState(prev => ({ ...prev, value: boolean }));
  }

  function onNotApplicableChange(boolean: boolean) {
    setState(prev => ({ ...prev, notApplicable: boolean }));
  }

  function createGPS() {
    setState(prev => ({ ...prev, gps: {} }));
  }

  function saveGPS(gpsData: GPS_DTO) {
    setState(prev => ({ ...prev, gps: gpsData }));
  }

  function deleteGPS() {
    setState(prev => ({ ...prev, gps: undefined }));
  }

  return (
    <WC.Modal
      title={state.label}
      widgetData={props.widgetData}
      onConfirm={() => onConfirm()}
      onDelete={() => props.onDelete()}
      onRequestClose={() => props.onRequestClose()}

      utilityButtons={
        <UtilityButtons
          showGPSButton={state.gps === undefined}
          onPress_GPSButton={() => createGPS()}
        />
      }
    >
      <Layout.Input.String
        label={R['Widget name']}
        backgroundColor={theme.background}
        color={theme.onBackground}
        color_placeholder={theme.onBackground_Placeholder}
        placeholder={R['Write widget name here...']}
        value={state.label}
        locked={!rules.allowLabelChange}
        onChangeText={(text) => onLabelChange(text)}
      />
      <Layout.Input.Boolean
        label={R['Value']}
        backgroundColor={theme.background}
        color={theme.onBackground}
        value={state.value}
        notApplicable={state.notApplicable}
        locked={!rules.allowValueChange}
        onSwitchChange={(boolean) => onValueChange(boolean)}
        onNotApplicableChange={(boolean) => onNotApplicableChange(boolean)}
      />
      {state.gps !== undefined && (
        <Layout.Input.GPS
          label="GPS"
          gpsData={state.gps}
          backgroundColor={theme.background}
          color={theme.onBackground}
          onPress_Delete={() => deleteGPS()}
          onPress_Save={(newGPSData) => saveGPS(newGPSData)}
        />
      )}
    </WC.Modal>
  );
}

function UtilityButtons(props: {
  showGPSButton: boolean
  onPress_GPSButton: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
    {props.showGPSButton && (
      <Layout.Button.Icon
        iconName="location"
        color_background={theme.secondary}
        color={theme.onSecondary}
        onPress={() => props.onPress_GPSButton()}
        style={{
          borderRadius: 10,
          height: 40,
          width: 80,
        }}
      />
    )}
  </>);
}
