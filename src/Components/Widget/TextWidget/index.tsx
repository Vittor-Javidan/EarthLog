import React, { useMemo, useState } from 'react';
import { Text } from 'react-native';
import { WidgetComponent } from '@WidgetComponents/index';

import { InputColors, Languages, TextWidgetData, ThemeDTO } from '@Types/index';
import { translations } from '@Translations/index';
import { Translations_TextWidget } from '@Translations/Widgets/TextWidget';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { WidgetRules } from '../Rules';
import { Layout } from '@Components/Layout';

export default function TextWidget(props: {
  widgetData: TextWidgetData
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
}) {

  const stringResources = useMemo<Translations_TextWidget[Languages]>(() => {
    return translations.Widgets.TextWidget[ConfigService.config.language];
  }, []);

  const [widgetData, setWidgetData] = useState<TextWidgetData>(props.widgetData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function onConfirm(widgetData: TextWidgetData) {

    setShowModal(false);

    if (WidgetRules.noEmptyLabel(widgetData)) {
      alert(stringResources['Widget name cannot be empty.']);
      setIsDataWrong(true);
      return;
    }

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

    if (showModal) {
      setIsDataWrong(false);
      setWidgetData(widgetData);
      props.onConfirm(widgetData);
    }
  }

  return (
    <WidgetComponent.Root

      label={widgetData.name}
      isDataWrong={isDataWrong}
      showModal={showModal}

      shortcutIconButtons={<>
        <ShortcutIconButtons
          widgetData={widgetData}
          onPencilPress={() => setShowModal(true)}
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
  );
}

function ShortcutIconButtons(props: {
  widgetData: TextWidgetData
  onPencilPress: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (<>
    {(props.widgetData.rules.allowLabelChange || props.widgetData.rules.allowValueChange) && (
      <Layout.Button.Icon
        iconName="pencil-sharp"
        color={theme.onSecondary}
        onPress={props.onPencilPress}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      />
    )}
  </>);
}

function DataDisplay(props: {
  widgetData: TextWidgetData
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_TextWidget[Languages]>(() => {
    return translations.Widgets.TextWidget[ConfigService.config.language];
  }, []);

  const isDataEmpty = props.widgetData.value === '';

  return (
    <Text
      maxFontSizeMultiplier={0}
      adjustsFontSizeToFit={true}
      style={{
        fontSize: ThemeService.FONTS.h3,
        color: isDataEmpty ? theme.modified : theme.onTertiary,
      }}
    >
      {isDataEmpty ? stringResources['Empty text'] : props.widgetData.value}
    </Text>
  );
}

function Modal(props: {
  widgetData: TextWidgetData
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_TextWidget[Languages]>(() => {
    return translations.Widgets.TextWidget[ConfigService.config.language];
  }, []);

  const [label, setLabel] = useState<string>(props.widgetData.name);
  const [value, setValue] = useState<string>(props.widgetData.value);

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
          type: 'text',
          value: value,
          rules: { ...rules },
        });
      }}
      onDelete={props.onDelete}
      onRequestClose={props.onRequestClose}
    >
      <Layout.Input.String
        colors={inputColors}
        label={stringResources['Widget Name']}
        placeholder={stringResources['Write widget name here...']}
        value={label}
        onChangeText={setLabel}
        locked={!rules.allowLabelChange}
        onResetPress={() => setLabel('')}
      />
      <Layout.Input.String
        colors={inputColors}
        label={stringResources['Text']}
        placeholder={stringResources['Write anything here...']}
        value={value}
        onChangeText={setValue}
        locked={!rules.allowValueChange}
        onResetPress={() => setValue('')}
      />
    </WidgetComponent.Modal>
  );
}
