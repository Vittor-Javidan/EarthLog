import React, { useMemo } from 'react';
import { View, Text, TextInput } from 'react-native';

import ConfigService from '@Services/ConfigService';

import IconButton from '../Button/IconButton';

export default function StringInput(props: {
  label: string
  value: string
  placeholder: string
  locked: boolean
  backgroundColor?: string
  color?: string
  color_placeholder?: string
  onChangeText?: (text: string) => void
  onResetPress?: () => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);

  const backgroundColor = props.backgroundColor ? props.backgroundColor : theme.background;
  const color = props.color ? props.color : theme.onBackground;
  const color_placeholder = props.color_placeholder ? props.color_placeholder : theme.onBackground_Placeholder;

  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingTop: 15,
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
          <IconButton
            iconName="refresh-sharp"
            color={color}
            onPress={props.onResetPress}
            style={{
              paddingHorizontal: 5,
              paddingVertical: 0,
              borderRadius: 10,
            }}
          />
        )}

      </View>
      <TextInput
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 10,
          backgroundColor: backgroundColor,
          color: color,
          borderColor: color,
          borderWidth: 2,
          borderRadius: 10,
        }}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={color_placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline
      />
    </View>
  );
}
