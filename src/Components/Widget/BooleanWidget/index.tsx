import React, { useMemo, useState } from 'react';
import { Switch, Platform } from 'react-native';


import { Layout } from '@Components/Layout';
import { BooleanWidgetData, GPS_DTO, WidgetAlertMessage } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { WidgetComponent } from '../Components';

export default function BooleanWidget(props: {
  widgetData: BooleanWidgetData
  statusFeedback?: JSX.Element
  alertMessages?: WidgetAlertMessage
  onConfirm: (widgetData: BooleanWidgetData) => void
  onDelete: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.BooleanWidget[language], []);

  const [widgetData, setWidgetData] = useState<BooleanWidgetData>(props.widgetData);
  const [showGPS, setShowGPS] = useState<boolean>(widgetData.gps !== undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function onConfirm_Modal(widgetData: BooleanWidgetData) {

    setShowModal(false);

    widgetData.gps !== undefined
    ? setShowGPS(true)
    : setShowGPS(false);

    if (showModal) {
      setIsDataWrong(false);
      setWidgetData(widgetData);
      props.onConfirm(widgetData);
    }
  }

  function onSwitchChange(boolean: boolean) {
    const newWidgetData = { ...widgetData, value: boolean };
    setWidgetData(newWidgetData);
    props.onConfirm(newWidgetData);
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

  return (<>
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 40,
          paddingHorizontal: 10,
        }}
      >
        <Layout.Text.P
          style={{
            color: theme.onTertiary,
          }}
        >
          {R[`${widgetData.value}`]}
        </Layout.Text.P>
        <Switch
          style={{
            paddingHorizontal: 0,
            transform: [{ scale: Platform.OS === 'ios' ? 0.75 : 1 }],
          }}
          trackColor={{ false: theme.wrong, true: theme.confirm }}
          ios_backgroundColor={theme.wrong}
          value={widgetData.value}
          onValueChange={(boolean) => onSwitchChange(boolean)}
        />
      </Layout.View>
      {showGPS && (
        <Layout.Input.GPS
          label="GPS"
          gpsData={widgetData.gps ?? {}}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.onBackground_Placeholder}
          onPress_Delete={() => onDeleteGPS()}
          onPress_Save={(newGPSData) => onSaveGPS(newGPSData)}
          style={{ marginBottom: 10 }}
        />
      )}

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

  const [label, setLabel] = useState<string>(props.widgetData.name);
  const [value, setValue] = useState<boolean>(props.widgetData.value);
  const [gpsData, setGPSData] = useState<GPS_DTO | undefined>(props.widgetData.gps);

  const { rules } = props.widgetData;

  function onConfirm() {

    const newWidgetData: BooleanWidgetData = {
      id_widget: props.widgetData.id_widget,
      name: label,
      type: 'boolean',
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
          value={label}
          locked={!rules.allowLabelChange}
          onChangeText={(text) => setLabel(text)}
        />
        <Layout.Input.Boolean
          label={R['Value']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          value={value}
          locked={!rules.allowValueChange}
          onSwitchChange={(boolean) => setValue(boolean)}
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
          />
        )}
      </Layout.View>
    </WidgetComponent.Modal>
  );
}
