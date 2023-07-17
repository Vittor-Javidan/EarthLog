import React from 'react';
import { View, Text, TextInput } from 'react-native';

import ThemeService from '@Services/ThemeService';

import { Layout } from '@Layout/index';
import { Icon } from '@Icon/index';

export default function StringInput(props: {
  label: string
  value: string
  placeholder: string
  backgroundColor_Label: string
  backgroundColor_Value: string
  color_Label: string
  color_Value: string
  color_Placeholder: string
  onChangeText: (text: string) => void
}) {
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
            color: props.color_Label,
            fontSize: ThemeService.FONTS.h3,
            paddingHorizontal: 10,
          }}
        >
          {props.label}
        </Text>
        <Icon.Root
          iconName="refresh-sharp"
          color={props.color_Label}
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
          backgroundColor: props.backgroundColor_Value,
          color: props.color_Value,
        }}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={props.color_Placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline
      />
    </View>
  );
}
