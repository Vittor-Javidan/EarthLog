import React, { useMemo, useState, useCallback } from 'react';
import { View as ReactNative_View, Text, Switch } from 'react-native';

import ConfigService from '@Services/ConfigService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import { BooleanWidgetData, WidgetLabel } from '@Services/ProjectService';

import { Icon } from '@Icon/index';
import { Layout } from '@Components/Layout';

export default function BooleanWidget(props: {
  label: string
  widgetData: BooleanWidgetData
  onConfirm: (label: string, widgetData: BooleanWidgetData) => void
}) {

  const [label, _] = useState<string>(props.label);
  const [widgetData, setWidgetData] = useState<BooleanWidgetData>(props.widgetData);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  const onSwitchChange = useCallback((label: string) => {
    setWidgetData(prev => {
      const newWidgetData = {
        ...prev,
        value: !prev.value,
        rules: {...prev.rules},
      };
      props.onConfirm(label, newWidgetData);
      return newWidgetData;
    });
  }, []);

  return (<>
    <ReactNative_View>
      <Label
        label={label}
        widgetData={widgetData}
        onSwitchChange={() => onSwitchChange(label)}
        onIconPress={() => setShowEditModal(true)}
      />
      <ValueDisplay
        widgetData={widgetData}
      />
    </ReactNative_View>
    {showEditModal && (
      <EditModal
        label={label}
        widgetData={widgetData}
        onRequestClose={() => setShowEditModal(false)}
        onConfirm={(label, value) => {
          // onConfirm(label, value, showEditModal);
        }}
      />
    )}
  </>);
}

function Label(props: {
  label: string
  widgetData: BooleanWidgetData
  onSwitchChange: () => void
  onIconPress: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <ReactNative_View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.primary,
        borderColor: theme.secondary,
        borderWidth: 1,
        height: 40,
      }}
    >
      <Text
        style={{
          width: '50%',
          paddingHorizontal: 10,
        }}
      >
        {props.label}
      </Text>
      <ReactNative_View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Switch
          style={{
            paddingHorizontal: 0,
          }}
          trackColor={{ false: theme.wrong, true: theme.confirm }}
          value={props.widgetData.value}
          onValueChange={props.onSwitchChange}
        />
        <Icon.Root
          iconName="pencil-sharp"
          paddingHorizontal={10}
          paddingVertical={5}
          color={theme.onPrimary}
          onPress={props.onIconPress}
        />
      </ReactNative_View>
    </ReactNative_View>
  );
}

function ValueDisplay(props: {
  widgetData: BooleanWidgetData
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <ReactNative_View
      style={{
        backgroundColor: theme.secondary,
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}
    >
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
    </ReactNative_View>
  );
}

function EditModal(props: {
  label: WidgetLabel
  widgetData: BooleanWidgetData
  onConfirm: (label: WidgetLabel, value: BooleanWidgetData) => void
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  const [label, setLabel] = useState<string>(props.label);
  const [value, setValue] = useState<boolean>(props.widgetData.value);

  const onRequestClose = useCallback(() => {
    props.onRequestClose();
  }, []);

  const onConfirm = useCallback((label: WidgetLabel, value: boolean) => {
    props.onConfirm(label, {
      type: 'boolean',
      value: value,
      rules: { ...props.widgetData.rules },
    });
  }, []);

  return (
    <Layout.Modal
      title={props.label}
      onRequestClose={onRequestClose}
    >
      <Layout.ScrollView>
        {/* {props.widgetData.rules.allowLabelChange && (
          <Input
            label="Label:"
            value={label}
            onChangeText={setLabel}
          />
        )} */}
        {/* <Input
          label="Value:"
          value={value}
          onChangeText={setValue}
        /> */}
      </Layout.ScrollView>
      <Layout.View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Layout.Button
          title="Save"
          onPress={() => onConfirm(label, value)}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
        />
      </Layout.View>
    </Layout.Modal>
  );
}
