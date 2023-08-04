import React, { useState, useMemo, ReactNode } from 'react';
import { Input } from '@Components/Inputs';
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
  const stringResources = useMemo(() => translations.Widgets.Components.Modal[ConfigService.config.language], []);

  return (
    <Layout.Modal
      title={props.title}
      onRequestClose={props.onRequestClose}
    >
      <Layout.ScrollView>
        {props.children}
        {props.widgetData.rules.allowValueChange && (
          <DeleteButton
            widgetLabel={props.title}
            onDelete={props.onDelete}
          />
        )}
        <Layout.Button
          title={stringResources['Save']}
          onPress={props.onConfirm}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
        />
      </Layout.ScrollView>
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
    <Input.String
      colors={inputColors}
      label={stringResources['Delete']}
      placeholder={stringResources['Type widget name perfectly to delete.']}
      value={widgetName}
      onChangeText={setWidgetName}
      locked={false}
      onResetPress={() => setWidgetName('')}
    />
    {isNameCorrect && <Layout.Button
      title={stringResources['Delete']}
      overrideBackgroundColor={theme.wrong}
      overrideTextColor={theme.onWrong}
      onPress={props.onDelete}
    />}
  </>);
}
