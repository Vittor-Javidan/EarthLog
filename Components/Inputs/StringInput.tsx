import React, { useMemo } from 'react';
import { View, Text, TextInput } from 'react-native';

import ThemeService from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';

import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';
import { InputColors } from '@Types/index';

export default function StringInput(props: {
  colors : InputColors
  label: string
  value: string
  placeholder: string
  locked: boolean
  onChangeText?: (text: string) => void
  onResetPress?: () => void
}) {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  const { label: LABEL_COLORS, dataDisplay: DATA_DISPLAY_COLORS } = props.colors;

  return (
    <View
      style={{
        backgroundColor: LABEL_COLORS.background,
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
            <Icon.Locked
              color={theme.wrong}
              onPress={() => {}}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            />
          </View>
        ) : (
          <Icon.Reset
            color={LABEL_COLORS.font}
            onPress={props.onResetPress}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          />
        )}
      </Layout.View>
      <TextInput
        style={{
          width: '100%',
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: DATA_DISPLAY_COLORS.background,
          color: DATA_DISPLAY_COLORS.font,
        }}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={DATA_DISPLAY_COLORS.font_placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline
      />
    </View>
  );
}
