import React, { useMemo } from 'react';
import { View, Text, TextInput } from 'react-native';

import ThemeService, { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';

export default function StringInput(props: {
  label: string
  value: string
  onChangeText: (text: string) => void
}) {

  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, []);

  return (
    <View
      style={{
        backgroundColor: theme.tertiary,
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
        <Icon.Root
          iconName="refresh-sharp"
          color={theme.onTertiary}
          paddingHorizontal={10}
          paddingVertical={5}
          onPress={() => props.onChangeText('')}
        />
      </Layout.View>
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
    </View>
  );
}
