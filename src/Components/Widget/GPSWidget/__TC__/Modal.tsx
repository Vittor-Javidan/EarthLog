import React, { useMemo, useState } from 'react';

import { GPSWidgetData, GPS_DTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';
import { WC } from '../../_WC_';

type State = {
  label: string
  gps: GPS_DTO
}

export default function Modal(props: {
  widgetData: GPSWidgetData
  onConfirm: (value: GPSWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [state, setState] = useState<State>({
    label: props.widgetData.name,
    gps: UtilService.deepCopy(props.widgetData.gps),
  });

  function onConfirm() {
    const newWidgetData: GPSWidgetData = {
      id_widget: props.widgetData.id_widget,
      name: state.label,
      type: 'gps',
      gps: state.gps,
      rules: props.widgetData.rules,
    };
    props.onConfirm(newWidgetData);
  }

  function onLabelChange(text: string) {
    setState(prev => ({ ...prev, label: text }));
  }

  function deleteGPS() {
    setState(prev => ({ ...prev, gps: {} }));
  }

  function saveGPS(gpsData: GPS_DTO) {
    setState(prev => ({ ...prev, gps: gpsData }));
  }

  return (
    <WC.Modal
      title={state.label}
      widgetData={props.widgetData}
      onConfirm={() => onConfirm()}
      onDelete={() => props.onDelete()}
      onRequestClose={() => props.onRequestClose()}
    >
      <Layout.Input.String
        label={R['Widget Name']}
        backgroundColor={theme.background}
        color={theme.onBackground}
        color_placeholder={theme.onBackground_Placeholder}
        placeholder={R['Write widget name here...']}
        value={state.label}
        locked={false}
        onChangeText={(text) => onLabelChange(text)}
      />
      <Layout.Input.GPS
        label="GPS"
        gpsData={state.gps}
        backgroundColor={theme.background}
        color={theme.onBackground}
        onPress_Delete={() => deleteGPS()}
        onPress_Save={(newGPSData) => saveGPS(newGPSData)}
      />
    </WC.Modal>
  );
}
