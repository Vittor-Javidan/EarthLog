import React, { useMemo, useState } from 'react';
import { WidgetComponent } from '@WidgetComponents/index';

import { TextWidgetData } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

import { WidgetRules } from '../Rules';
import { Layout } from '@Components/Layout';
import UtilService from '@Services/UtilService';
import { useTiming } from '@Hooks/index';

export default function TextWidget(props: {
  widgetData: TextWidgetData
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [widgetData, setWidgetData] = useState<TextWidgetData>(props.widgetData);
  const [defaultData, setDefaultData] = useState(UtilService.deepCloning(props.widgetData));
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(props.widgetData.value);
  const [saved, setSaved] = useState<boolean>(true);

  useTiming(() => {
    if (!saved) {
      const newWidgetData = {
        ...widgetData,
        value: displayText,
      };
      setWidgetData(newWidgetData);
      props.onConfirm(newWidgetData);
      setSaved(true);
    }
  }, [saved], 1);

  function onConfirm(widgetData: TextWidgetData) {

    setShowModal(false);

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
      setDisplayText(widgetData.value);
      props.onConfirm(widgetData);
    }
  }

  function onConfirm_Modal(widgetData: TextWidgetData) {
    onConfirm(widgetData);
    setDefaultData(widgetData);
  }

  function onTextChange(text: string) {
    setDisplayText(text);
    setSaved(false);
  }

  function onResetText() {
    setDisplayText(defaultData.value);
    setSaved(false);
  }

  return (
    <WidgetComponent.Root

      label={widgetData.name}
      isDataWrong={isDataWrong}
      showModal={showModal}

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
          gap: 5,
        }}
      >
        <Layout.Input.String
          label={stringResources['Text']}
          value={displayText}
          backgroundColor={theme.tertiary}
          color={theme.onTertiary}
          color_placeholder={theme.modified}
          placeholder={stringResources['Empty text']}
          locked={false}
          onChangeText={(text) => onTextChange(text)}
          onResetPress={() => onResetText()}
        />
      </Layout.View>

    </WidgetComponent.Root>
  );
}

function IconButtons_Top(props: {
  widgetData: TextWidgetData
  onPencilPress: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

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

function Modal(props: {
  widgetData: TextWidgetData
  onConfirm: (value: TextWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Widgets.TextWidget[language], []);

  const [defaultData] = useState(UtilService.deepCloning(props.widgetData));
  const [label, setLabel] = useState<string>(props.widgetData.name);
  const [value, setValue] = useState<string>(props.widgetData.value);

  const { rules } = props.widgetData;

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
          onChangeText={setLabel}
          locked={!rules.allowLabelChange}
          onResetPress={() => setLabel(defaultData.name)}
        />
        <Layout.Input.String
          label={stringResources['Text']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          color_placeholder={theme.onBackground_Placeholder}
          placeholder={stringResources['Write anything here...']}
          value={value}
          onChangeText={setValue}
          locked={!rules.allowValueChange}
          onResetPress={() => setValue(defaultData.value)}
        />
      </Layout.View>
    </WidgetComponent.Modal>
  );
}
