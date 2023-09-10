import React, { useMemo } from 'react';
import { View, Switch, Platform } from 'react-native';
import * as Vibration from 'expo-haptics';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import H3 from '../Text/H3';
import Checkbox from '../Button/Checkbox';
import InputRoot from './Root';

export default function BooleanInput(props: {
  label?: string
  backgroundColor: string
  color: string
  value: boolean
  locked: boolean
  notApplicable?: boolean
  onSwitchChange: (value: boolean) => void
  onNotApplicableChange?: (value: boolean) => void
}) {

  const { theme, language } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Input.BooleanInput[language], []);

  const valueColor = props.notApplicable === true
    ? props.color
    : props.value === true
      ? theme.confirm
      : theme.wrong
  ;

  const trackColor_False = props.notApplicable === true ? props.color : theme.wrong;
  const trackColor_True = props.notApplicable === true ? props.color : theme.confirm;

  async function onSwitchChange(boolean: boolean) {
    if (props.notApplicable === true) {
      return;
    }
    props.onSwitchChange(boolean);
    await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
  }

  function onNotApplicableChange(boolean: boolean) {
    if (props.onNotApplicableChange === undefined) {
      return;
    }
    props.onNotApplicableChange(boolean);
  }

  return (
    <InputRoot
      backgroundColor={props.backgroundColor}
      color={props.color}
      label={props.label}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <H3
        style={{
          color: valueColor,
          fontWeight: '900',
        }}
      >
        {R[`${props.value}`]}
      </H3>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {props.notApplicable !== undefined && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <H3
              style={{
                color: props.color,
                fontWeight: '900',
              }}
            >
              N/A:
            </H3>
            <Checkbox
              value={props.notApplicable}
              onChange={(boolean) => onNotApplicableChange(boolean)}
            />
          </View>
        )}
        <Switch
          style={{ transform: [{ scale: Platform.OS === 'ios' ? 0.75 : 1 }] }}
          trackColor={{ false: trackColor_False, true: trackColor_True }}
          ios_backgroundColor={trackColor_False}
          value={props.value}
          onValueChange={(boolean) => onSwitchChange(boolean)}
          thumbColor={props.notApplicable === true ? props.color : undefined}
        />
      </View>
    </InputRoot>
  );
}
