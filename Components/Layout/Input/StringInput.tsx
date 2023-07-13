import React, { useMemo, useState } from 'react';
import {
  View as ReactNative_View,
  Text,
  TextInput,
} from 'react-native';

import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import ProjectService, { StringType } from '@Services/ProjectService';

import View from '@Components/Layout/View';
import ScrollView from '@Components/Layout/ScrollView';
import Modal from '@Components/Layout/Modal';
import Button from '@Components/Layout/Button';
import { Icon } from '@Components/Layout/Icon';

export default function StringInput(props: {
  label: string
  projectInfo: StringType
  enableLabelEdit: boolean
  onConfirm: (label: string, value: StringType) => void
}) {

  const [showdEditModal, setShowEditModal] = useState<boolean>(false);
  const [isDataWrong, setIsDataWrong] = useState<boolean>(false);

  function isLabelInvalid(label: string) {
    return (
      props.enableLabelEdit &&
      showdEditModal &&
      ProjectService.KEY_LABELS.includes(label)
    );
  }

  function onConfirm(label: string, value: StringType) {

    setShowEditModal(false);

    if (isLabelInvalid(label)) {
      alert(`Forbiden Label: ${label}`);
      setIsDataWrong(true);
      return;
    }

    if (showdEditModal) {
      setIsDataWrong(false);
      props.onConfirm(label, value);
    }
  }

  return (<>
    <ReactNative_View>
      <Label
        label={props.label}
        wrongData={isDataWrong}
        onIconPress={() => setShowEditModal(true)}
      />
      <ValueDisplay
        value={props.projectInfo.value}
      />
    </ReactNative_View>
    {showdEditModal && (
      <EditModal
        label={props.label}
        projectInfo={props.projectInfo}
        enableLabelEdit={props.enableLabelEdit}
        onRequestClose={() => setShowEditModal(false)}
        onConfirm={onConfirm}
      />
    )}
  </>);
}

function Label(props: {
  label: string
  wrongData: boolean
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
        backgroundColor: props.wrongData ? theme.wrong : theme.primary,
        borderColor: theme.secondary,
        borderWidth: 1,
        height: 40,
      }}
    >
      <Text
        maxFontSizeMultiplier={0}
        adjustsFontSizeToFit={true}
        style={{
          width: '50%',
          paddingHorizontal: 10,
          fontSize: ThemeService.FONTS.h3,
          color: props.wrongData ? theme.onWrong : theme.onPrimary,
        }}
      >
        {props.label}
      </Text>
      <Icon.Root
        iconName="pencil-sharp"
        paddingHorizontal={10}
        paddingVertical={5}
        color={theme.onPrimary}
        onPress={props.onIconPress}
      />
    </ReactNative_View>
  );
}

function ValueDisplay(props: {
  value: string
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
        {props.value}
      </Text>
    </ReactNative_View>
  );
}

function EditModal(props: {
  label: string
  projectInfo: StringType
  enableLabelEdit: boolean
  onConfirm: (label: string, value: StringType) => void
  onRequestClose: () => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  const [label, setLabel] = useState<string>(props.label);
  const [value, setValue] = useState<string>(props.projectInfo.value);

  function onRequestClose() {
    props.onRequestClose();
  }

  function onConfirm() {
    props.onConfirm(label, {
      type: 'string',
      value: value,
    });
  }

  return (
    <Modal
      title={props.label}
      onRequestClose={onRequestClose}
    >
      <ScrollView>
        {props.enableLabelEdit && (
          <Input
            label="Label:"
            value={label}
            onChangeText={setLabel}
          />
        )}
        <Input
          label="Value:"
          value={value}
          onChangeText={setValue}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Button
          title="Save"
          onPress={onConfirm}
          overrideBackgroundColor={theme.confirm}
          overrideTextColor={theme.onConfirm}
        />
      </View>
    </Modal>
  );
}

function Input(props: {
  label: string
  value: string
  onChangeText: (text: string) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <ReactNative_View
      style={{
        backgroundColor: theme.tertiary,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 40,
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
      >
        <Text
          style={{
            color: theme.onTertiary,
            fontSize: ThemeService.FONTS.h3,
            paddingHorizontal: 10,
          }}
        >
          {props.label}
        </Text>
        <Icon.Root
          iconName="refresh-sharp"
          color={theme.onTertiary}
          paddingHorizontal={10}
          paddingVertical={5}
          onPress={() => props.onChangeText('')}
        />
      </View>
      <TextInput
        style={{
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: theme.background,
          color: theme.onBackground,
        }}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder="string"
        placeholderTextColor={theme.onBackground}
        textAlign="left"
        textAlignVertical="top"
        multiline
      />
    </ReactNative_View>
  );
}
