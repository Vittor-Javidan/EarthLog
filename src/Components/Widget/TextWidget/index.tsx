import React, { useMemo, useState } from 'react';

import { GPS_DTO, TextWidgetData, WidgetAlertMessage, WidgetData } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';
import { WidgetRules } from '../Rules';

import { Layout } from '@Components/Layout';
import { WidgetComponent } from '@WidgetComponents/index';

export default function TextWidget(props: {
  widgetData: TextWidgetData
  statusFeedback?: JSX.Element
  alertMessages?: WidgetAlertMessage
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [widgetData, setWidgetData] = useState<TextWidgetData>(UtilService.deepCloning(props.widgetData));
  const [showGPS, setShowGPS] = useState<boolean>(widgetData.gps !== undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function validateConfirm(widgetData: TextWidgetData) {

    if (WidgetRules.noSpaces(widgetData)) {
      alert(stringResources['Value cannot have empty spaces.']);
      setIsDataWrong(true);
      return;
    }

    if (WidgetRules.noSpecialLetters(widgetData)) {
      alert(stringResources['only numbers, and letter from "a" to "z" or "A" to "Z" is allow.']);
      setIsDataWrong(true);
      return;
    }

    setIsDataWrong(false);
    props.onConfirm(widgetData);
  }

  function onConfirm_Modal(widgetData: TextWidgetData) {

    setShowModal(false);

    widgetData.gps !== undefined
    ? setShowGPS(true)
    : setShowGPS(false);

    setWidgetData(widgetData);
    validateConfirm(widgetData);
  }

  function onTextChange(text: string) {
    const newData: WidgetData = {
      ...widgetData,
      value: text,
      rules: {
        ...widgetData.rules,
      },
    };
    setWidgetData(newData);
    validateConfirm(newData);
  }

  function onSaveGPS(newGPSData: GPS_DTO) {
    const newWidgetData = { ...widgetData, gps: newGPSData };
    setWidgetData(newWidgetData);
    props.onConfirm(newWidgetData);
  }

  function onDeleteGPS() {
    if (widgetData.gps !== undefined) {
      const newWidgetData = { ...widgetData };
      delete newWidgetData.gps;
      setWidgetData(newWidgetData);
      props.onConfirm(newWidgetData);
    }
    setShowGPS(false);
  }

  return (
    <WidgetComponent.Root

      label={widgetData.name}
      isDataWrong={isDataWrong}
      showModal={showModal}
      statusFeedback={props.statusFeedback}
      alertMessages={props.alertMessages}

      iconButtons_Top={
        <IconButtons_Top
          widgetData={widgetData}
          showGPS={showGPS}
          onPencilPress={() => setShowModal(true)}
          onGPSPress={() => setShowGPS(true)}
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
          gap: 10,
        }}
      >
        <Layout.Input.String
          label={''}
          value={widgetData.value}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onTertiary_Placeholder}
          placeholder={stringResources['Write anything here...']}
          locked={false}
          onChangeText={(text) => onTextChange(text)}
        />
        {showGPS && (
          <Layout.Input.GPS
            label="GPS"
            gpsData={widgetData.gps ?? {}}
            backgroundColor={theme.tertiary}
            color={theme.onTertiary}
            color_placeholder={theme.onBackground_Placeholder}
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

function Modal(props: {
  widgetData: TextWidgetData
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [label, setLabel] = useState<string>(props.widgetData.name);
  const [value, setValue] = useState<string>(props.widgetData.value);
  const [gpsData, setGPSData] = useState<GPS_DTO | undefined>(props.widgetData.gps);

  const { rules } = props.widgetData;

  function onConfirm() {

    const newWidgetData: TextWidgetData = {
      id_widget: props.widgetData.id_widget,
      name: label,
      type: 'text',
      value: value,
      rules: { ...props.widgetData.rules },
    };

    if (gpsData !== undefined) {
      newWidgetData.gps = gpsData;
    }

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
          locked={!rules.allowLabelChange}
          onChangeText={(text) => setLabel(text)}
        />
        <Layout.Input.String
          label={stringResources['Text']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          color_placeholder={theme.onBackground_Placeholder}
          placeholder={stringResources['Write anything here...']}
          value={value}
          locked={!rules.allowValueChange}
          onChangeText={(text) => setValue(text)}
        />
        {gpsData === undefined ? (
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
              onPress={() => setGPSData({})}
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
            gpsData={gpsData}
            backgroundColor={theme.background}
            color={theme.onBackground}
            color_placeholder={theme.onBackground_Placeholder}
            onPress_Delete={() => setGPSData(undefined)}
            onPress_Save={(newGPSData) => setGPSData(newGPSData)}
            style={{ borderRadius: 10 }}
          />
        )}
      </Layout.View>
    </WidgetComponent.Modal>
  );
}
