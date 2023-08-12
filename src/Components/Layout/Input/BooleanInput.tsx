import React, { useMemo } from 'react';
import { View, Text, Switch } from 'react-native';

import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import IconButton from '../Button/IconButton';

export default function BooleanInput(props: {
  label: string
  backgroundColor: string
  color: string
  value: boolean
  locked: boolean
  onSwitchChange?: (value: boolean) => void
}) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Data.Boolean[language], []);

  const backgroundColor = props.backgroundColor ? props.backgroundColor : theme.background;
  const color = props.color ? props.color : theme.onBackground;

  return (
    <View
      style={{
        paddingHorizontal: 5,
      }}
    >
      <Text
        style={{
          position: 'absolute',
          backgroundColor: backgroundColor,
          color: color,
          fontSize: 20,
          paddingHorizontal: 5,
          top: 0,
          left: 15,
          zIndex: 1,
        }}
      >
        {props.label}
      </Text>
      <View
        style={{
          height: 15,
        }}
      >
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            backgroundColor: backgroundColor,
            zIndex: 1,
            height: 30,
            top: 0,
            right: 15,
          }}
        >
          {props.locked ? (
            <IconButton
              iconName="lock-closed-sharp"
              color={theme.wrong}
              onPress={() => {}}
              style={{
                paddingHorizontal: 5,
                paddingVertical: 0,
                borderRadius: 10,
              }}
            />
          ) : (
            <Switch
              trackColor={{ false: theme.wrong, true: theme.confirm }}
              ios_backgroundColor={theme.wrong}
              value={props.value}
              onValueChange={props.onSwitchChange}
            />
          )}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: backgroundColor,
          borderColor: theme.primary,
          borderWidth: 2,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: color,
          }}
        >
          {stringResources[`${props.value}`]}
        </Text>
      </View>
    </View>
  );
}
