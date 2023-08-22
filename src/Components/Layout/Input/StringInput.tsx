import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleProp, TextStyle, Platform } from 'react-native';

import ConfigService from '@Services/ConfigService';

import IconButton from '../Button/IconButton';

/**
 * @REACT_NATIVE_BUG https://github.com/facebook/react-native/issues/36494
 * <TextInput /> ˜onChangeText˜ is fired on render. Be carefull on wich code is writed for this
 * callback to trigger.
 */
export default function StringInput(props: {
  label: string
  value: string
  placeholder: string
  locked: boolean
  style_TextInput?: StyleProp<TextStyle>
  backgroundColor?: string
  color?: string
  color_placeholder?: string
  onChangeText: (text: string) => void
}) {

  const { theme } = useMemo(() => ConfigService.config, []);
  const [showUndo, setShowUndo] = useState<boolean>(false);
  const [deletedText, setDeletedText] = useState<string>('');

  function onChange(text: string) {
    props.onChangeText(text);
  }

  function onResetPress() {

    if (props.value === '') {
      return;
    }

    setDeletedText(props.value);
    setShowUndo(true);
    props.onChangeText('');
  }

  function onUndoPress() {
    props.onChangeText(deletedText);
    setShowUndo(false);
  }

  const backgroundColor = props.backgroundColor ? props.backgroundColor : theme.background;
  const color = props.color ? props.color : theme.onBackground;
  const color_placeholder = props.color_placeholder ? props.color_placeholder : theme.onBackground_Placeholder;
  const showLabel = props.label !== '';

  return (
    <View
      style={{
        paddingHorizontal: 5,
        paddingTop: 15,
      }}
    >
      {showLabel && <Text
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
      </Text>}
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
        {props.locked && (
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
        )}
        {!props.locked && (<>
          {showUndo && (
            <IconButton
              iconName="arrow-undo"
              color={color}
              onPress={() => onUndoPress()}
              style={{
                paddingHorizontal: 5,
                paddingVertical: 0,
                borderRadius: 10,
              }}
            />
          )}
          <IconButton
            iconName="close"
            color={color}
            onPress={() => onResetPress()}
            style={{
              paddingHorizontal: 5,
              paddingVertical: 0,
              borderRadius: 10,
            }}
          />
        </>)}
      </View>
      <TextInput
        style={[{
          width: '100%',
          paddingHorizontal: 10,
          paddingTop: 15,
          paddingBottom: Platform.OS === 'ios' ? 10 : 0,
          backgroundColor: backgroundColor,
          color: color,
          borderColor: color,
          borderWidth: 2,
          borderRadius: 10,
        }, props.style_TextInput]}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={color_placeholder}
        textAlign="left"
        textAlignVertical="top"
        multiline
        onChangeText={(text) => onChange(text)}
      />
    </View>
  );
}
