import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';

import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import { TextWidgetData, WidgetData, WidgetLabel } from '@Services/ProjectService';

import { Layout } from '@Components/Layout';
import { Input } from '@Inputs/index';
import { WidgetComponent } from '@WidgetComponents/index';

import { WidgetRules } from '../Rules';

export default function TextWidget(props: {
  label: WidgetLabel
  widgetData: TextWidgetData
  widgets: Record<WidgetLabel, WidgetData>
  onConfirm: (label: WidgetLabel, value: TextWidgetData) => void
}) {

  const [label, setLabel] = useState<string>(props.label);
  const [widgetData, setWidgetData] = useState<TextWidgetData>(props.widgetData);
  const [showModal, setShowEditModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function onConfirm(label: WidgetLabel, value: TextWidgetData) {

    setShowEditModal(false);

    if (props.label !== label && WidgetRules.noDuplicatedLabel(label, props.widgets)) {
      setIsDataWrong(true);
      return;
    }

    if (WidgetRules.noEmptyLabel(label)) {
      alert('Labels cannot be empty');
      setIsDataWrong(true);
      return;
    }

    if (WidgetRules.noSpaces(value)) {
      alert(`${label} cannot have empty spaces`);
      setIsDataWrong(true);
      return;
    }

    if (WidgetRules.noSpecialLetters(value)) {
      alert(`${label} can have only numbers, and letter from "a to z" or "A to Z".`);
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

  return (
    <WidgetComponent.Root

      label={label}
      isDataWrong={isDataWrong}
      showModal={showModal}

      icons={<>
        <Icons
          widgetData={widgetData}
          onPencilPress={() => setShowEditModal(true)}
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
          onRequestClose={() => setShowEditModal(false)}
          onConfirm={onConfirm}
        />
      </>}
    />
  );
}

function Icons(props: {
  widgetData: TextWidgetData
  onPencilPress: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (<>
    {(props.widgetData.rules.allowLabelChange || props.widgetData.rules.allowValueChange) && (
      <Layout.Icon.Root
        iconName="pencil-sharp"
        paddingHorizontal={10}
        paddingVertical={5}
        color={theme.onPrimary}
        onPress={props.onPencilPress}
      />
    )}
  </>);
}

function DataDisplay(props: {
  widgetData: TextWidgetData
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
      {props.widgetData.value}
    </Text>
  );
}

function Modal(props: {
  label: WidgetLabel
  widgetData: TextWidgetData
  onConfirm: (label: WidgetLabel, value: TextWidgetData) => void
  onRequestClose: () => void
}) {

  const [label, setLabel] = useState<string>(props.label);
  const [value, setValue] = useState<string>(props.widgetData.value);

  return (
    <WidgetComponent.Modal
      title={props.label}
      onRequestClose={props.onRequestClose}
      onConfirm={() => {
        props.onConfirm(label, {
          type: 'string',
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
        <Input.String
          label="Value:"
          value={value}
          onChangeText={setValue}
        />
      )}
    </WidgetComponent.Modal>
  );
}
