import React, { useMemo } from 'react';
import { View, Text, Switch } from 'react-native';
import { Layout } from '@Layout/index';

import { translations } from '@Translations/index';
import { Translations_BooleanData } from '@Translations/Data/Boolean';

import ConfigService from '@Services/ConfigService';
import { Languages } from '@Services/LanguageService';
import ThemeService, { ThemeDTO } from '@Services/ThemeService';


export default function BooleanInput(props: {
  label: string
  value: boolean
  backgroundColor_Label: string
  backgroundColor_Value: string
  color_Label: string
  color_Value: string
  onSwitchChange: (value: boolean) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);
  const stringResources = useMemo<Translations_BooleanData[Languages]>(() => {
    return translations.Data.Boolean[ConfigService.config.language];
  }, []);

  return (
    <View
      style={{
        backgroundColor: props.backgroundColor_Label,
      }}
    >
      <Layout.View
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
        <Switch
          style={{
            paddingHorizontal: 0,
          }}
          trackColor={{ false: theme.wrong, true: theme.confirm }}
          value={props.value}
          onValueChange={props.onSwitchChange}
        />
      </Layout.View>
      <View
        style={{
          backgroundColor: props.backgroundColor_Value,
          paddingHorizontal: 10,
          paddingVertical: 10,
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
