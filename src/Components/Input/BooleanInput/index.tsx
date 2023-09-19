import React, { useState, useMemo } from 'react';
import { View, Switch, Platform } from 'react-native';
import * as Vibration from 'expo-haptics';

import { BooleanInputData, InputStatus } from '@Types/ProjectTypes';
import { useTimeout } from '@Hooks/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';

import { Text } from '@Text/index';
import { Button } from '@Button/index';
import { LC } from '../__LC__';

type InputTheme = {
  font: string
  background: string
  confirm: string
  wrong: string
  disabled: string
}

export default function BooleanInput(props: {
  inputData: BooleanInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  theme: InputTheme
  onSave: (inputData: BooleanInputData | null, status: InputStatus ) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) {

  const { theme } = props;
  const { language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.BooleanInput[language], []);

  const [inputData  , setInputData  ] = useState<BooleanInputData>(UtilService.deepCopy(props.inputData));
  const [saveSignal , setSaveSignal ] = useState<boolean>(false);

  const notApplicableUndefined = inputData.notApplicable === undefined;
  const notApplicableFalse     = inputData.notApplicable === false;

  const valueColor = (notApplicableUndefined || notApplicableFalse) ? (
    inputData.value === true ? theme.confirm : theme.wrong
  ) : theme.disabled;

  const thumbColor = inputData.notApplicable === true
    ? theme.disabled
    : inputData.value
      ? theme.confirm
      : theme.wrong
  ;

  useTimeout(async () => {
    if (saveSignal) {
      props.onSave(UtilService.deepCopy(inputData), 'ready to save');
      setSaveSignal(false);
    }
  }, [inputData, saveSignal], 200);

  function onSwitchChange(boolean: boolean) {
    if (notApplicableUndefined || notApplicableFalse) {
      Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
      props.onSave(null, 'modifying');
      setInputData(prev => ({ ...prev, value: boolean }));
      setSaveSignal(true);
      return;
    }
  }

  function onNotApplicableChange(boolean: boolean) {
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, notApplicable: boolean }));
    setSaveSignal(true);
  }

  function onLabelChange(newLabel: string) {
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, label: newLabel}));
    setSaveSignal(true);
  }

  return (
    <LC.Root

      label={inputData.label}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label)}
      onInputDelete={() => props.onInputDelete()}
      onInputMoveUp={() => props.onInputMoveUp()}
      onInputMoveDow={() => props.onInputMoveDow()}
      theme={theme}

      iconButtons={<></>}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: props.editWidget ? 0 : -5,
        }}
      >
        <Text.H3
          style={{
            color: valueColor,
            fontWeight: '900',
          }}
        >
          {R[`${inputData.value}`]}
        </Text.H3>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {inputData.notApplicable !== undefined && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Text.H3
                style={{
                  color: theme.font,
                  fontWeight: '900',
                }}
              >
                N/A:
              </Text.H3>
              <Button.Checkbox
                value={inputData.notApplicable}
                onChange={(boolean) => onNotApplicableChange(boolean)}
                theme={theme}
              />
            </View>
          )}
          <Switch
            style={{ transform: [{ scale: Platform.OS === 'ios' ? 0.75 : 1 }] }}
            trackColor={{ false: theme.font, true: theme.font }}
            ios_backgroundColor={theme.font}
            value={inputData.value}
            onValueChange={(boolean) => onSwitchChange(boolean)}
            thumbColor={thumbColor}
          />
        </View>
      </View>
    </LC.Root>
  );
}
