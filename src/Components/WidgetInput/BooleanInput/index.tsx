import React, { useState, useMemo, memo, useCallback } from 'react';
import { View, Switch, Platform } from 'react-native';

import { BooleanInputData, InputStatus, WidgetRules } from '@Types/ProjectTypes';
import { translations } from '@Translations/index';
import { useTimeout } from '@Hooks/index';
import ConfigService from '@Services/ConfigService';
import UtilService from '@Services/UtilService';
import HapticsService from '@Services/HapticsService';

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

export const BooleanInput = memo((props: {
  inputData: BooleanInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: InputTheme
  onSave: (inputData: BooleanInputData | null, status: InputStatus ) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.booleanInput[config.language], []);

  const [inputData  , setInputData  ] = useState<BooleanInputData>(UtilService.deepCopy(props.inputData));
  const [saveSignal , setSaveSignal ] = useState<boolean>(false);

  const notApplicableUndefined = inputData.notApplicable === undefined;
  const notApplicableFalse     = inputData.notApplicable === false;

  const valueColor = (notApplicableUndefined || notApplicableFalse) ? (
    inputData.value === true ? props.theme.confirm : props.theme.wrong
  ) : props.theme.disabled;

  const thumbColor = inputData.notApplicable === true
    ? props.theme.disabled
    : inputData.value
      ? props.theme.confirm
      : props.theme.wrong
  ;

  useTimeout(async () => {
    if (saveSignal) {
      props.onSave(UtilService.deepCopy(inputData), 'ready to save');
      setSaveSignal(false);
    }
  }, [inputData, saveSignal], 200);

  const onSwitchChange = useCallback((boolean: boolean) => {
    if (inputData.lockedData !== true && (notApplicableUndefined || notApplicableFalse)) {
      HapticsService.vibrate('success');
      props.onSave(null, 'modifying');
      setInputData(prev => ({ ...prev, value: boolean }));
      setSaveSignal(true);
      return;
    }
  }, [props.onSave, inputData.lockedData, notApplicableUndefined, notApplicableFalse]);

  const onNotApplicableChange = useCallback((boolean: boolean) => {
    if (inputData.lockedData !== true) {
      HapticsService.vibrate('success');
      props.onSave(null, 'modifying');
      setInputData(prev => ({ ...prev, notApplicable: boolean }));
      setSaveSignal(true);
    }
  }, [props.onSave, inputData.lockedData]);

  const onLabelChange = useCallback((newLabel: string) => {
    props.onSave(null, 'modifying');
    setInputData(prev => ({ ...prev, label: newLabel}));
    setSaveSignal(true);
  }, [props.onSave]);

  return (
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label)}
      onInputDelete={() => props.onInputDelete()}
      onInputMoveUp={() => props.onInputMoveUp()}
      onInputMoveDow={() => props.onInputMoveDow()}
      widgetRules={props.widgetRules}
      theme={props.theme}

      iconButtons={
        <IconButtons
          locked={inputData.lockedData}
          theme={props.theme}
        />
      }
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: props.editWidget || inputData.lockedData ? 0 : -5,
        }}
      >
        <Text h3
          style={{
            color: valueColor,
            fontWeight: '900',
          }}
        >
          {R[`${inputData.value}`]}
        </Text>
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
              <Text h3
                style={{
                  color: props.theme.font,
                  fontWeight: '900',
                }}
              >
                N/A:
              </Text>
              <Button.Checkbox
                value={inputData.notApplicable}
                onChange={(boolean) => onNotApplicableChange(boolean)}
                theme={props.theme}
              />
            </View>
          )}
          <Switch
            style={{ transform: [{ scale: Platform.OS === 'ios' ? 0.75 : 1 }] }}
            trackColor={{ false: props.theme.font, true: props.theme.font }}
            ios_backgroundColor={props.theme.font}
            value={inputData.value}
            onValueChange={(boolean) => onSwitchChange(boolean)}
            thumbColor={thumbColor}
          />
        </View>
      </View>
    </LC.Root>
  );
});

const IconButtons = memo((props: {
  locked: boolean | undefined
  theme: InputTheme
}) => {

  return (<>
    {props.locked && (
      <LC.NavbarIconButton
        iconName="lock-closed-sharp"
        onPress={() => {}}
        theme={{
          font: props.theme.wrong,
          background: props.theme.background,
        }}
      />
    )}
  </>);
});
