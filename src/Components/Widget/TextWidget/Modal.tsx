import React, { useMemo, useState } from 'react';

import { GPS_DTO, TextWidgetData } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Components/Layout';
import { WidgetComponent } from '@WidgetComponents/index';
import UtilService from '@Services/UtilService';

export default function Modal(props: {
  widgetData: TextWidgetData
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [state, setState] = useState({
    label: props.widgetData.name,
    value: props.widgetData.value,
    gpsData: props.widgetData.gps !== undefined ? UtilService.deepCloning(props.widgetData.gps) : undefined,
  });

  const { rules } = props.widgetData;

  function onConfirm() {

    const newWidgetData: TextWidgetData = {
      id_widget: props.widgetData.id_widget,
      name: state.label,
      type: 'text',
      value: state.value,
      rules: rules,
    };

    if (state.gpsData !== undefined) {
      newWidgetData.gps = state.gpsData;
    }

    props.onConfirm(newWidgetData);
  }

  function onLabelChange(text: string) {
    setState(prev => ({ ...prev, label: text }));
  }

  function onValueChange(text: string) {
    setState(prev => ({ ...prev, value: text }));
  }

  function createGPS() {
    setState(prev => ({ ...prev, gpsData: {} }));
  }

  function saveGPS(gpsData: GPS_DTO) {
    setState(prev => ({ ...prev, gpsData: gpsData }));
  }

  function deleteGPS() {
    setState(prev => ({ ...prev, gpsData: undefined }));
  }

  return (
    <WidgetComponent.Modal
      title={state.label}
      widgetData={props.widgetData}
      onConfirm={() => onConfirm()}
      onDelete={props.onDelete}
      onRequestClose={props.onRequestClose}
    >
      <Layout.View
        style={{
          gap: 10,
        }}
      >
        <Layout.Input.String
          label={R['Widget Name']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          color_placeholder={theme.onBackground_Placeholder}
          placeholder={R['Write widget name here...']}
          value={state.label}
          locked={!rules.allowLabelChange}
          onChangeText={(text) => onLabelChange(text)}
        />
        <Layout.Input.String
          label={R['Text']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          color_placeholder={theme.onBackground_Placeholder}
          placeholder={R['Write anything here...']}
          value={state.value}
          locked={!rules.allowValueChange}
          onChangeText={(text) => onValueChange(text)}
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
              onPress={() => createGPS()}
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
            onPress_Delete={() => deleteGPS()}
            onPress_Save={(newGPSData) => saveGPS(newGPSData)}
            style={{ borderRadius: 10 }}
          />
        )}
      </Layout.View>
    </WidgetComponent.Modal>
  );
}
