import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import * as Vibration from 'expo-haptics';

import { WidgetThemeDTO } from '@Types/ProjectTypes';
import FontService from '@Services/FontService';

import { Text } from '@Text/index';

export function LabelButton(props: {
  label: string
  editLabel: boolean
  theme: WidgetThemeDTO
  noInputs: boolean
  onPress: () => void
  onConfirm: () => void
  onLabelChange: (label: string) => void
}) {

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
        marginBottom: -10,
      }}
    >
      {props.editLabel ? (
        <TextInput
          style={{
            textAlign: 'center',
            backgroundColor: props.theme.font,
            color: props.theme.background,
            fontSize: FontService.FONTS.h2,
            borderRadius: 5,
            paddingVertical: 0,
            paddingHorizontal: 5,
            minWidth: 50,
          }}
          value={props.label}
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
              color: props.theme.font,
              paddingHorizontal: 5,
              marginBottom: 0,
            }}
          >
            {props.label === '' ? '-------' : props.label}
          </Text.H2>
        </Pressable>
      )}
    </View>
  );
}
