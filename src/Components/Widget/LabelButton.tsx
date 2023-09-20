import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { WidgetThemeData } from '@Types/ProjectTypes';
import ThemeService from '@Services/ThemeService';

import { Text } from '@Text/index';

export function LabelButton(props: {
  label: string
  editLabel: boolean
  theme: WidgetThemeData
  onPress: () => void
  onConfirm: () => void
  onLabelChange: (label: string) => void
}) {

  const { theme, label } = props;

  function onPress() {
    props.onPress();
    Vibration.notificationAsync(Vibration.NotificationFeedbackType.Warning);
  }

  return (
    <View
      style={{
        alignItems: 'flex-start',
        alignSelf: 'center',
        paddingHorizontal: 5,
      }}
    >
      {props.editLabel ? (
        <TextInput
          style={{
            textAlign: 'center',
            backgroundColor: theme.font,
            color: theme.background,
            fontSize: ThemeService.FONTS.h2,
            borderRadius: 5,
            paddingVertical: 0,
            paddingHorizontal: 5,
            minWidth: 50,
          }}
          value={label}
          onChangeText={(text) => props.onLabelChange(text)}
          onBlur={() => props.onConfirm()}
          multiline={props.editLabel ? true : false}
          autoFocus
        />
      ) : (
        <Pressable
          onPress={() => onPress()}
        >
          <Text.H2
            style={{
              textAlign: 'center',
              color: theme.font,
              paddingHorizontal: 5,
              marginBottom: -10,
            }}
          >
            {props.label === '' ? '-------' : props.label}
          </Text.H2>
        </Pressable>
      )}
    </View>
  );
}
