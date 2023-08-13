import React, { useMemo, useState } from 'react';
import { Switch, Platform } from 'react-native';

import ConfigService from '@Services/ConfigService';

import { WidgetComponent } from '../Components';
import { BooleanWidgetData } from '@Types/index';
import { Layout } from '@Components/Layout';
import { translations } from '@Translations/index';

export default function BooleanWidget(props: {
  widgetData: BooleanWidgetData
  onConfirm: (widgetData: BooleanWidgetData) => void
  onDelete: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Data.Boolean[language], []);

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

      iconButtons_Top={
        <IconButtons_Top
          widgetData={widgetData}
          onPencilPress={() => setShowModal(true)}
        />
      }

      modal={
        <Modal
          widgetData={widgetData}
          onConfirm={(widgetData) => onConfirm(widgetData)}
          onDelete={() => props.onDelete()}
          onRequestClose={() => setShowModal(false)}
        />
      }
    >

      <Layout.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 40,
          paddingHorizontal: 10,
        }}
      >
        <Layout.Text.P
          style={{
            color: theme.onTertiary,
          }}
        >
          {stringResources[`${widgetData.value}`]}
        </Layout.Text.P>
        <Switch
          style={{
            paddingHorizontal: 0,
            transform: [{ scale: Platform.OS === 'ios' ? 0.75 : 1 }],
          }}
          trackColor={{ false: theme.wrong, true: theme.confirm }}
          ios_backgroundColor={theme.wrong}
          value={widgetData.value}
          onValueChange={() => onSwitchChange()}
        />
      </Layout.View>

    </WidgetComponent.Root>
  </>);
}

function IconButtons_Top(props: {
  widgetData: BooleanWidgetData
  onPencilPress: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  return (<>
    {(props.widgetData.rules.allowLabelChange) && (
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
  widgetData: BooleanWidgetData
  onConfirm: (value: BooleanWidgetData) => void
  onDelete: () => void
  onRequestClose: () => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const stringResources = useMemo(() => translations.Widgets.BooleanWidget[language], []);

  const [label, setLabel] = useState<string>(props.widgetData.name);
  const [value, setValue] = useState<boolean>(props.widgetData.value);

  const { rules } = props.widgetData;

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
      <Layout.View
        style={{
          gap: 10,
        }}
      >
        <Layout.Input.String
          label={stringResources['Widget name']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          color_placeholder={theme.onBackground_Placeholder}
          placeholder={stringResources['Write widget name here...']}
          value={label}
          onChangeText={setLabel}
          locked={!rules.allowLabelChange}
          onResetPress={() => setLabel('')}
        />
        <Layout.Input.Boolean
          label={stringResources['Value']}
          backgroundColor={theme.background}
          color={theme.onBackground}
          value={value}
          locked={!rules.allowValueChange}
          onSwitchChange={setValue}
        />
      </Layout.View>
    </WidgetComponent.Modal>
  );
}
