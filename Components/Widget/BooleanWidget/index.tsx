import React, { useMemo, useState } from 'react';
import { Text, Switch } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import ProjectService, { BooleanWidgetData, WidgetData, WidgetLabel } from '@Services/ProjectService';

import { Icon } from '@Icon/index';
import { Input } from '@Components/Inputs';

import { WidgetRules } from '../Rules';
import { WidgetComponent } from '../Components';

export default function BooleanWidget(props: {
  label: string
  widgetData: BooleanWidgetData
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (label: string, widgetData: BooleanWidgetData) => void
  onDelete: () => void
}) {

  const [label, setLabel] = useState<string>(props.label);
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
      props.onConfirm(label, newWidgetData);
      return newWidgetData;
    });
  }

  function onConfirm(label: WidgetLabel, value: BooleanWidgetData) {

    setShowModal(false);

    if (props.label !== label && WidgetRules.noDuplicatedLabel(label, props.widgets)) {
      alert(`The label ${label} already axists`);
      setIsDataWrong(true);
      return;
    }

    if (WidgetRules.noEmptyLabel(label)) {
      alert('Labels cannot be empty');
      setIsDataWrong(true);
      return;
    }

    if (showModal) {
      setIsDataWrong(false);
      setLabel(label);
      setWidgetData(value);
      props.onConfirm(label, value);
    }
  }

  return (<>
    <WidgetComponent.Root

      label={label}
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
          label={label}
          widgetData={widgetData}
          onConfirm={(label, widgetData) => onConfirm(label, widgetData)}
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
      <Icon.Edit
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
  label: WidgetLabel
  widgetData: BooleanWidgetData
  onConfirm: (label: WidgetLabel, value: BooleanWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  const [label, setLabel] = useState<string>(props.label);
  const [value, setValue] = useState<boolean>(props.widgetData.value);

  return (
    <WidgetComponent.Modal
      title={props.label}
      widgetData={props.widgetData}
      onConfirm={() => {
        props.onConfirm(label, {
          id_widget: ProjectService.generateUuidV4(),
          type: 'boolean',
          value: value,
          rules: { ...props.widgetData.rules },
        });
      }}
      onDelete={props.onDelete}
      onRequestClose={props.onRequestClose}
    >
      {props.widgetData.rules.allowLabelChange && (
        <Input.String
          label="Label:"
          backgroundColor_Label={theme.tertiary}
          backgroundColor_Value={theme.background}
          color_Label={theme.onTertiary}
          color_Value={theme.onBackground}
          color_Placeholder={theme.onBackground_Placeholder}
          placeholder="Write widget name here..."
          value={label}
          onChangeText={setLabel}
          onResetPress={() => setLabel('')}
        />
      )}
      {props.widgetData.rules.allowValueChange && (
        <Input.Boolean
          label="Value:"
          backgroundColor_Label={theme.tertiary}
          backgroundColor_Value={theme.background}
          color_Label={theme.onTertiary}
          color_Value={theme.onBackground}
          value={value}
          onSwitchChange={setValue}
        />
      )}
    </WidgetComponent.Modal>
  );
}
