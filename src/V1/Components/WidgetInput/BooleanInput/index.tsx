import React, { useState, useMemo, memo, useCallback } from 'react';
import { View, Switch, Platform } from 'react-native';

import { BooleanInputData, WidgetRules, WidgetTheme } from '@V1/Types/ProjectTypes';
import { translations } from '@V1/Translations/index';
import HapticsService from '@V1/Services/HapticsService';
import ConfigService from '@V1/Services/ConfigService';
import UtilService from '@V1/Services/UtilService';

import { Text } from '@V1/Text/index';
import { LC } from '../__LC__';
import { NotApplicableButton } from './NotApplicableButton';

export const BooleanInput = memo((props: {
  inputData: BooleanInputData
  editWidget: boolean
  isFirstInput: boolean
  isLastInput: boolean
  widgetRules: WidgetRules
  theme: WidgetTheme
  onSave: (inputData: BooleanInputData) => void
  onInputDelete: () => void
  onInputMoveUp: () => void
  onInputMoveDow: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.widgetInput.boolean[config.language], []);

  const [inputData , setInputData] = useState<BooleanInputData>(UtilService.deepCopy(props.inputData));

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

  /**
   * @WARNING
   * Never call this function from inside a state setter.
   * It can cause `Cannot update a component while rendering a different component` react error.
   */
  const asyncSave = useCallback(async (inputData: BooleanInputData) => {
    props.onSave(UtilService.deepCopy(inputData));
  }, [props.onSave]);

  const onLabelChange = useCallback((newLabel: string, inputData: BooleanInputData) => {
    const newData : BooleanInputData = { ...inputData, label: newLabel};
    asyncSave(newData);
    setInputData(newData);
  }, [asyncSave]);

  const onNotApplicableChange = useCallback((boolean: boolean, inputData: BooleanInputData) => {
    if (inputData.lockedData !== true) {
      HapticsService.vibrate('success');
      const newData: BooleanInputData = { ...inputData, notApplicable: boolean };
      asyncSave(newData);
      setInputData(newData);
    }
  }, [asyncSave]);

  const onSwitchChange = useCallback((boolean: boolean, inputData: BooleanInputData) => {
    if (
      inputData.lockedData !== true &&
      (notApplicableUndefined || notApplicableFalse)
    ) {
      HapticsService.vibrate('success');
      const newData: BooleanInputData = { ...inputData, value: boolean };
      asyncSave(newData);
      setInputData(newData);
    }
  }, [asyncSave, notApplicableUndefined, notApplicableFalse]);

  return (
    <LC.Root

      label={inputData.label}
      lockedLabel={inputData.lockedLabel}
      editWidget={props.editWidget}
      isFirstInput={props.isFirstInput}
      isLastInput={props.isLastInput}
      onLabelChange={(label) => onLabelChange(label, inputData)}
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
          paddingVertical: Platform.OS === 'ios' ? 10 : 0,
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
          <NotApplicableButton
            notApplicable={inputData.notApplicable}
            onNotApplicableChange={(boolean) => onNotApplicableChange(boolean, inputData)}
            theme={props.theme}
          />
          <Switch
            style={{ transform: [{ scale: Platform.OS === 'ios' ? 0.75 : 1 }] }}
            trackColor={{ false: props.theme.font, true: props.theme.font }}
            ios_backgroundColor={props.theme.font}
            value={inputData.value}
            onValueChange={(boolean) => onSwitchChange(boolean, inputData)}
            thumbColor={thumbColor}
          />
        </View>
      </View>
    </LC.Root>
  );
});

const IconButtons = memo((props: {
  locked: boolean | undefined
  theme: WidgetTheme
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
