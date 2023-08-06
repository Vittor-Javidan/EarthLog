import React, { useState, useMemo, ReactNode } from 'react';
import { Layout } from '@Components/Layout';

import { InputColors, ThemeDTO, WidgetData } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';

export default function Modal(props: {
  title: string
  widgetData: WidgetData
  children: ReactNode
  onConfirm: () => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <Layout.Modal
      title={props.title}
      onRequestClose={props.onRequestClose}
    >
      <Layout.ScrollView
        style={{ flex: 1 }}
      >
        {props.children}
        {props.widgetData.rules.allowValueChange && (
          <DeleteButton
            widgetLabel={props.title}
            onDelete={props.onDelete}
          />
        )}
      </Layout.ScrollView>
      <Layout.ScreenButtons
        button_right={
          <Layout.Button.IconRounded
            iconName="save"
            showPlusSign={false}
            color_background={theme.confirm}
            color={theme.onConfirm}
            onPress={props.onConfirm}
          />
        }
      />
    </Layout.Modal>
  );
}

function DeleteButton(props: {
  widgetLabel: string
  onDelete: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo(() => translations.Widgets.Components.Modal[ConfigService.config.language], []);

  const [widgetName, setWidgetName] = useState<string>('');
  const isNameCorrect = widgetName === props.widgetLabel;

  const inputColors: InputColors = {
    label: {
      background: theme.wrong,
      font: theme.onWrong,
    },
    dataDisplay: {
      background: theme.background,
      font: theme.onBackground,
      font_placeholder: theme.onBackground_Placeholder,
    },
  };

  return (<>
    <Layout.Input.String
      colors={inputColors}
      label={stringResources['Delete']}
      placeholder={stringResources['Type widget name perfectly to delete.']}
      value={widgetName}
      onChangeText={setWidgetName}
      locked={false}
      onResetPress={() => setWidgetName('')}
    />
    {isNameCorrect && <Layout.Button.Text
      title={stringResources['Delete']}
      color_background={theme.wrong}
      color_font={theme.onWrong}
      onPress={props.onDelete}
    />}
  </>);
}
