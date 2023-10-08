import React, { memo, useCallback } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { WidgetThemeDTO } from '@Types/ProjectTypes';
import FontService from '@Services/FontService';
import HapticsService from '@Services/HapticsService';

import { Text } from '@Text/index';

export const WidgetLabelButton = memo((props: {
  label: string
  editLabel: boolean
  theme: WidgetThemeDTO
  onPress: () => void
  onConfirm: () => void
  onLabelChange: (label: string) => void
}) => {

  const onPress = useCallback(() => {
    props.onPress();
    HapticsService.vibrate('warning');
  }, [props.onPress]);

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
          <Text h2
            style={{
              textAlign: 'center',
              color: props.theme.font,
              paddingHorizontal: 5,
            }}
          >
            {props.label === '' ? '-------' : props.label}
          </Text>
        </Pressable>
      )}
    </View>
  );
});
