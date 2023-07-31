import React, { useState, useMemo, ReactNode } from 'react';
import { Input } from '@Components/Inputs';
import { Layout } from '@Components/Layout';

import { ThemeDTO, WidgetData } from '@Types/index';

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
      <Layout.ScrollView>
        {props.children}
        {props.widgetData.rules.allowValueChange && (
          <DeleteButton
            widgetLabel={props.title}
            onDelete={props.onDelete}
          />
        )}
        <Layout.Button
          title="Save"
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

  const [widgetName, setWidgetName] = useState<string>('');
  const isNameCorrect = widgetName === props.widgetLabel;

  return (<>
    <Input.String
      label="Delete"
      placeholder="Type widget name perfectly to delete."
      backgroundColor_Label={theme.wrong}
      backgroundColor_Value={theme.background}
      color_Label={theme.onWrong}
      color_Value={theme.onBackground}
      color_Placeholder={theme.onBackground_Placeholder}
      value={widgetName}
      onChangeText={setWidgetName}
      onResetPress={() => setWidgetName('')}
    />
    {isNameCorrect && <Layout.Button
      title="confirm to delete"
      overrideBackgroundColor={theme.wrong}
      overrideTextColor={theme.onWrong}
      onPress={props.onDelete}
    />}
  </>);
}
