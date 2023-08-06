import React, { useMemo } from 'react';
import { View, Text, Switch } from 'react-native';

import { InputColors } from '@Types/index';
import { translations } from '@Translations/index';

import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';
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

  const { label: LABEL_COLORS, dataDisplay: DATA_DISPLAY_COLORS } = props.colors;

  return (
    <View
      style={{
        backgroundColor: LABEL_COLORS.background,
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
          gap: 5,
          padding: 5,
        }}
      >
        <Text
          style={{
            color: LABEL_COLORS.font,
            fontSize: ThemeService.FONTS.h3,
            paddingHorizontal: 10,
          }}
        >
          {props.label}
        </Text>
        {props.locked ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: theme.wrong,
                fontSize: ThemeService.FONTS.h3,
              }}
            >
              Locked
            </Text>
            <IconButton
              iconName="lock-closed-sharp"
              color={theme.wrong}
              onPress={() => {}}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            />
          </View>
        ) : (
          <Switch
            style={{
              paddingHorizontal: 0,
            }}
            trackColor={{ false: theme.wrong, true: theme.confirm }}
            value={props.value}
            onValueChange={props.onSwitchChange}
          />
        )}
      </View>
      <View
        style={{
          backgroundColor: DATA_DISPLAY_COLORS.background,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            color: DATA_DISPLAY_COLORS.font,
          }}
        >
          {props.value ? stringResources['True'] : stringResources['False']}
        </Text>
      </View>
    </View>
  );
}
