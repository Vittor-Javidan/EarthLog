import React, { useMemo, useState } from 'react';

import { Layout } from '@Components/Layout';
import { GPSWidgetData, GPS_DTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { WidgetComponent } from '../Components';

export default function GPSWidget(props: {
  widgetData: GPSWidgetData
  statusFeedback?: JSX.Element
  onConfirm: (widgetData: GPSWidgetData) => void
  onDelete: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  // const stringResources = useMemo(() => translations.Widgets.BooleanWidget[language], []);

  const [widgetData, setWidgetData] = useState<GPSWidgetData>(props.widgetData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function onConfirm_Modal(widgetData: GPSWidgetData) {

    setShowModal(false);

    if (showModal) {
      setIsDataWrong(false);
      setWidgetData(widgetData);
      props.onConfirm(widgetData);
    }
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData: GPSWidgetData = { ...widgetData, value: newGPSData };
    setWidgetData(newWidgetData);
    props.onConfirm(newWidgetData);
  }

  function onDeleteGPS() {
    const newWidgetData: GPSWidgetData = { ...widgetData, value: {} };
    setWidgetData(newWidgetData);
    props.onConfirm(newWidgetData);
  }

  return (
    <WidgetComponent.Root

      label={widgetData.name}
      isDataWrong={isDataWrong}
      showModal={showModal}
      statusFeedback={props.statusFeedback}

      iconButtons_Top={
        <IconButtons_Top
          widgetData={widgetData}
          onPencilPress={() => setShowModal(true)}
        />
      }

      modal={
        <Modal
          widgetData={widgetData}
          onConfirm={(widgetData) => onConfirm_Modal(widgetData)}
          onDelete={() => props.onDelete()}
          onRequestClose={() => setShowModal(false)}
        />
      }
    >
      <Layout.View
        style={{
          paddingVertical: 5,
          paddingBottom: 10,
          gap: 5,
        }}
      >
        <Layout.Input.GPS
          label="GPS"
          gpsData={widgetData.value ?? {}}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onBackground_Placeholder}
          onPress_Delete={() => onDeleteGPS()}
          onPress_Save={(newGPSData) => onSaveGPS(newGPSData)}
          hideDeleteButton
        />
      </Layout.View>
    </WidgetComponent.Root>
  );
}

function IconButtons_Top(props: {
  widgetData: GPSWidgetData
  onPencilPress: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
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
  </>);
}

function Modal(props: {
  widgetData: GPSWidgetData
  onConfirm: (value: GPSWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [label, setLabel] = useState<string>(props.widgetData.name);
  const [value, setValue] = useState<GPS_DTO>(props.widgetData.value);

  function onConfirm() {

    const newWidgetData: GPSWidgetData = {
      id_widget: props.widgetData.id_widget,
      name: label,
      type: 'gps',
      value: value,
      rules: { ...props.widgetData.rules },
    };

    props.onConfirm(newWidgetData);
  }

  return (
    <WidgetComponent.Modal
      title={label}
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
          label={stringResources['Widget Name']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          color_placeholder={theme.onBackground_Placeholder}
          placeholder={stringResources['Write widget name here...']}
          value={label}
          locked={false}
          onChangeText={(text) => setLabel(text)}
        />
        <Layout.Input.GPS
          label="GPS"
          gpsData={value}
          backgroundColor={theme.background}
          color={theme.onBackground}
          color_placeholder={theme.onBackground_Placeholder}
          onPress_Delete={() => setValue({})}
          onPress_Save={(newGPSData) => setValue(newGPSData)}
        />
      </Layout.View>
    </WidgetComponent.Modal>
  );
}
