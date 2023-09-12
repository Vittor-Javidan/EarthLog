import React, { useState, useMemo } from 'react';
import { View } from 'react-native';

import { WidgetData, WidgetTypes } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import ProjectService from '@Services/ProjectService';

import { Layout } from '@Components/Layout';

export default function AddWidgetButton(props: {
  onCreateWidget: (widgetData: WidgetData) => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [label, setlabel] = useState<string>('');

  function onPress(widgetType: WidgetTypes) {
    const widgetData = ProjectService.getWidgetData(widgetType);
    widgetData.name = label;
    props.onCreateWidget(widgetData);
    reset();
  }

  function reset() {
    setlabel('');
    setShowModal(false);
  }

  return (<>
    <Layout.Button.IconRounded
      iconName="list"
      showPlusSign={true}
      color_background={theme.confirm}
      color={theme.onConfirm}
      onPress={() => setShowModal(true)}
    />
    {showModal && (
      <Modal
        label={label}
        onRequestClose={() => setShowModal(false)}
        onChangeText_Label={(text) => setlabel(text)}
        onPress_WidgetButton={(widgetType) => onPress(widgetType)}
      />
    )}
  </>);
}

function Modal(props: {
  label: string
  onRequestClose: () => void
  onChangeText_Label: (text: string) => void
  onPress_WidgetButton: (widgetType: WidgetTypes) => void
}) {

  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.AddWidgetButton[language], []);

  return (
    <Layout.Modal
      title={R['Add Widget']}
      onRequestClose={() => props.onRequestClose()}
      style={{
        padding: 5,
      }}
    >
      <Layout.Input.String
        label={R['Widget name']}
        placeholder={R['Write a name to the widget here...']}
        value={props.label}
        locked={false}
        onChangeText={(text) => props.onChangeText_Label(text)}
      />
      <WidgetButtons
        onPress_WidgetButton={(widgetType) => props.onPress_WidgetButton(widgetType)}
      />
    </Layout.Modal>
  );
}

function WidgetButtons(props: {
  onPress_WidgetButton: (widgetType: WidgetTypes) => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Widgets.AddWidgetButton[language], []);

  return (
    <View>
      <Layout.ScrollView
        style={{
          marginTop: 10,
          marginHorizontal: 5,
          paddingVertical: 20,
          borderRadius: 10,
          backgroundColor: theme.secondary,
        }}
        contenContainerStyle={{
          gap: 2,
          paddingBottom: 0,
        }}
      >
        <Layout.Button.Text
          title={R['True/False']}
          color_background={theme.tertiary}
          color_font={theme.onTertiary}
          onPress={() => props.onPress_WidgetButton('boolean')}
        />
        <Layout.Button.Text
          title={R['Text']}
          color_background={theme.tertiary}
          color_font={theme.onTertiary}
          onPress={() => props.onPress_WidgetButton('text')}
        />
        <Layout.Button.Text
          title={'GPS'}
          color_background={theme.tertiary}
          color_font={theme.onTertiary}
          onPress={() => props.onPress_WidgetButton('gps')}
        />
      </Layout.ScrollView>
    </View>
  );
}
