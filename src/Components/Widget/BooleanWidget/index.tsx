import React, { useMemo, useState } from 'react';
import { Text, Switch } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { WidgetRules } from '../Rules';
import { WidgetComponent } from '../Components';
import { BooleanWidgetData, InputColors, ThemeDTO } from '@Types/index';
import { Layout } from '@Components/Layout';

export default function BooleanWidget(props: {
  widgetData: BooleanWidgetData
  onConfirm: (widgetData: BooleanWidgetData) => void
  onDelete: () => void
}) {

  const [widgetData, setWidgetData] = useState<BooleanWidgetData>(props.widgetData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function onSwitchChange() {
    setWidgetData(prev => {
      const newWidgetData = {
        ...prev,
        value: !prev.value,
        rules: {...prev.rules},
      };
      props.onConfirm(newWidgetData);
      return newWidgetData;
    });
  }

  function onConfirm(widgetData: BooleanWidgetData) {

    setShowModal(false);

    if (WidgetRules.noEmptyLabel(widgetData)) {
      alert('Labels cannot be empty');
      setIsDataWrong(true);
      return;
    }

    if (showModal) {
      setIsDataWrong(false);
      setWidgetData(widgetData);
      props.onConfirm(widgetData);
    }
  }

  return (<>
    <WidgetComponent.Root

      label={widgetData.name}
      isDataWrong={isDataWrong}
      showModal={showModal}

      shortcutIconButtons={<>
        <ShortcutIconButtons
          widgetData={widgetData}
          onPencilPress={() => setShowModal(true)}
          onSwitchChange={() => onSwitchChange()}
        />
      </>}

      dataDisplay={<>
        <DataDisplay
          widgetData={widgetData}
        />
      </>}

      modal={<>
        <Modal
          widgetData={widgetData}
          onConfirm={(widgetData) => onConfirm(widgetData)}
          onDelete={props.onDelete}
          onRequestClose={() => setShowModal(false)}
        />
      </>}
    />
  </>);
}

function ShortcutIconButtons(props: {
  widgetData: BooleanWidgetData
  onPencilPress: () => void
  onSwitchChange: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (<>
    <Switch
      style={{
        paddingHorizontal: 0,
      }}
      trackColor={{ false: theme.wrong, true: theme.confirm }}
      value={props.widgetData.value}
      onValueChange={props.onSwitchChange}
    />
    {(props.widgetData.rules.allowLabelChange) && (
      <Layout.Button.Icon
        iconName="pencil-sharp"
        color={theme.onPrimary}
        onPress={props.onPencilPress}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      />
    )}
  </>);
}

function DataDisplay(props : {
  widgetData: BooleanWidgetData
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <Text
      maxFontSizeMultiplier={0}
      adjustsFontSizeToFit={true}
      style={{
        fontSize: ThemeService.FONTS.h3,
        color: theme.onTertiary,
      }}
    >
      {String(props.widgetData.value)}
    </Text>
  );
}

function Modal(props: {
  widgetData: BooleanWidgetData
  onConfirm: (value: BooleanWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  const [label, setLabel] = useState<string>(props.widgetData.name);
  const [value, setValue] = useState<boolean>(props.widgetData.value);

  const { rules } = props.widgetData;

  const inputColors: InputColors = {
    label: {
      background: theme.tertiary,
      font: theme.onTertiary,
    },
    dataDisplay: {
      background: theme.background,
      font: theme.onBackground,
      font_placeholder: theme.onBackground_Placeholder,
    },
  };

  return (
    <WidgetComponent.Modal
      title={label}
      widgetData={props.widgetData}
      onConfirm={() => {
        props.onConfirm({
          id_widget: props.widgetData.id_widget,
          name: label,
          type: 'boolean',
          value: value,
          rules: { ...props.widgetData.rules },
        });
      }}
      onDelete={props.onDelete}
      onRequestClose={props.onRequestClose}
    >
      <Layout.Input.String
        colors={inputColors}
        label="Label:"
        placeholder="Write widget name here..."
        value={label}
        onChangeText={setLabel}
        locked={!rules.allowLabelChange}
        onResetPress={() => setLabel('')}
      />
      <Layout.Input.Boolean
        label="Value:"
        colors={inputColors}
        value={value}
        locked={!rules.allowValueChange}
        onSwitchChange={setValue}
      />
    </WidgetComponent.Modal>
  );
}
