import React, { useMemo, useState } from 'react';
import { Text, Switch } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import { BooleanWidgetData, WidgetData, WidgetLabel } from '@Services/ProjectService';

import { Icon } from '@Icon/index';
import { Input } from '@Components/Inputs';

import { WidgetRules } from '../Rules';
import { WidgetComponent } from '../Components';

export default function BooleanWidget(props: {
  label: string
  widgetData: BooleanWidgetData
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (label: string, widgetData: BooleanWidgetData) => void
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
          onRequestClose={() => setShowModal(false)}
          onConfirm={(label, widgetData) => onConfirm(label, widgetData)}
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
      <Icon.Root
        iconName="pencil-sharp"
        paddingHorizontal={10}
        paddingVertical={5}
        color={theme.onPrimary}
        onPress={props.onPencilPress}
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
  onRequestClose: () => void
}) {

  const [label, setLabel] = useState<string>(props.label);
  const [value, setValue] = useState<boolean>(props.widgetData.value);

  return (
    <WidgetComponent.Modal
      title={props.label}
      onRequestClose={props.onRequestClose}
      onConfirm={() => {
        props.onConfirm(label, {
          type: 'boolean',
          value: value,
          rules: { ...props.widgetData.rules },
        });
      }}
    >
      {props.widgetData.rules.allowLabelChange && (
        <Input.String
          label="Label:"
          value={label}
          onChangeText={setLabel}
        />
      )}
      {props.widgetData.rules.allowValueChange && (
        <Input.Boolean
          label="Value:"
          value={value}
          onSwitchChange={setValue}
        />
      )}
    </WidgetComponent.Modal>
  );
}
