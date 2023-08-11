import React, { useMemo } from 'react';
import { View, Text, Switch } from 'react-native';

import { InputColors } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import IconButton from '../Button/IconButton';

export default function BooleanInput(props: {
  colors : InputColors
  label: string
  value: boolean
  locked: boolean
  onSwitchChange?: (value: boolean) => void
}) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);
  const stringResources = useMemo(() => translations.Data.Boolean[language], []);

  return (
    <View
    style={{
      backgroundColor: theme.background,
      paddingHorizontal: 5,
    }}
    >
      <Text
        style={{
          position: 'absolute',
          backgroundColor: theme.background,
          color: theme.onBackground,
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
            backgroundColor: theme.background,
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
          backgroundColor: theme.background,
          borderColor: theme.primary,
          borderWidth: 2,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: theme.onBackground,
          }}
        >
          {props.value ? stringResources['True'] : stringResources['False']}
        </Text>
      </View>
    </View>
  );
}
