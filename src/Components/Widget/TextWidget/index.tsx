import React, { useMemo, useState } from 'react';

import { GPS_DTO, TextWidgetData, WidgetAlertMessage } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import { Layout } from '@Components/Layout';
import { WC } from '@Components/Widget/_WC_/index';
import { TC } from './__TC__';
import Rules_TextWidgets from './Rules';

export default function TextWidget(props: {
  widgetData: TextWidgetData
  statusFeedback?: JSX.Element
  alertMessages?: WidgetAlertMessage
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [widgetData,  setWidgetData ] = useState<TextWidgetData>(UtilService.deepCopy(props.widgetData));
  const [showGPS,     setShowGPS    ] = useState<boolean>(props.widgetData.gps !== undefined);
  const [showModal,   setShowModal  ] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function onConfirm_Modal(widgetData: TextWidgetData) {
    setWidgetData(UtilService.deepCopy(widgetData));
    setShowModal(false);
    setShowGPS(widgetData.gps !== undefined);
    setIsDataWrong(false);
    props.onConfirm(widgetData);
  }

  function onTextChange(text: string) {
    const newWidgetData = { ...widgetData, value: text };
    Rules_TextWidgets.checkRules(widgetData, (isValid) => {
      setWidgetData(newWidgetData);
      setIsDataWrong(!isValid);
      if (isValid) {
        props.onConfirm(UtilService.deepCopy(newWidgetData));
      }
    });
  }

  function createGPS() {
    setWidgetData(prev => ({ ...prev, gps: {} }));
    setShowGPS(true);
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData = { ...widgetData, gps: newGPSData };
    setWidgetData(newWidgetData);
    props.onConfirm(UtilService.deepCopy(newWidgetData));
  }

  function onDeleteGPS() {
    if (widgetData.gps !== undefined) {
      const newWidgetData = { ...widgetData };
      delete newWidgetData.gps;
      setWidgetData(newWidgetData);
      setShowGPS(false);
      props.onConfirm(UtilService.deepCopy(newWidgetData));
      return;
    }
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
          showGPS={showGPS}
          onPencilPress={() => setShowModal(true)}
          onGPSPress={() => createGPS()}
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
      <Layout.Input.String
        label={''}
        value={widgetData.value}
        backgroundColor={theme.tertiary}
        color={theme.onTertiary}
        color_placeholder={theme.onTertiary_Placeholder}
        placeholder={R['Write anything here...']}
        locked={false}
        onChangeText={(text) => onTextChange(text)}
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
  );
}
