import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, Dimensions } from 'react-native';
import * as Vibration from 'expo-haptics';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemeDTO } from '@Types/AppTypes';
import { translations } from '@Translations/index';
import UtilService from '@Services/UtilService';
import ConfigService from '@Services/ConfigService';

import { Input } from '@Input/index';
import { API } from '../__API__';

export default function AllInputs(): JSX.Element {

  const { theme } = useMemo(() => ConfigService.config, [ConfigService.config.theme]);

  return (
    <View>
      <CustomInput themeKey="background"               savedValue={theme.background} />
      <CustomInput themeKey="onBackground"             savedValue={theme.onBackground} />
      <CustomInput themeKey="onBackground_Placeholder" savedValue={theme.onBackground_Placeholder} />
      <CustomInput themeKey="primary"                  savedValue={theme.primary} />
      <CustomInput themeKey="onPrimary"                savedValue={theme.onPrimary} />
      <CustomInput themeKey="onPrimary_Placeholder"    savedValue={theme.onPrimary_Placeholder} />
      <CustomInput themeKey="secondary"                savedValue={theme.secondary} />
      <CustomInput themeKey="onSecondary"              savedValue={theme.onSecondary} />
      <CustomInput themeKey="onSecondary_PlaceHolder"  savedValue={theme.onSecondary_PlaceHolder} />
      <CustomInput themeKey="tertiary"                 savedValue={theme.tertiary} />
      <CustomInput themeKey="onTertiary"               savedValue={theme.onTertiary} />
      <CustomInput themeKey="onTertiary_Placeholder"   savedValue={theme.onTertiary_Placeholder} />
      <CustomInput themeKey="confirm"                  savedValue={theme.confirm} />
      <CustomInput themeKey="onConfirm"                savedValue={theme.onConfirm} />
      <CustomInput themeKey="modified"                 savedValue={theme.modified} />
      <CustomInput themeKey="onModified"               savedValue={theme.onModified} />
      <CustomInput themeKey="wrong"                    savedValue={theme.wrong} />
      <CustomInput themeKey="onWrong"                  savedValue={theme.onWrong} />
      <CustomInput themeKey="onPressColorPrimary"      savedValue={theme.onPressColorPrimary} />
    </View>
  );
}

function CustomInput(props: {
  themeKey: keyof ThemeDTO
  savedValue: string
}) {

  const { language, theme } = useMemo(() => ConfigService.config, [ConfigService.config.theme]);
  const R = useMemo(() => translations.Screens.ThemeScreen[language], []);
  const { width: WIDTH } = useMemo(() => Dimensions.get('window'), []);

  const [color, setColor] = useState<string>(props.savedValue);
  const [valid, setValid] = useState<boolean>(true);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [iconPressed, setIconPressed] = useState<boolean>(false);

  function isValidColor(value: string) {
    return UtilService.hexColorRegex.test(value);
  }

  function onUpdate(value: string) {
    setColor(value);
    setValid(isValidColor(value));
    if (isValidColor(value)) {
      API.ExampleFigure.update(props.themeKey, value);
    }
  }

  return (
    <View
      style={{
        borderColor: theme.secondary,
        borderBottomWidth: 1,
      }}
    >
      {!valid && (
        <Text
          adjustsFontSizeToFit={true}
          style={{
            padding: 5,
            color: theme.wrong,
            maxHeight: 48,
          }}
        >
          {R['Invalid Color']}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxHeight: 48,
        }}
      >
        <Text
          adjustsFontSizeToFit={true}
          style={{
            flex: 6,
            padding: 10,
            backgroundColor: theme.primary,
            height: 48,
            verticalAlign: 'middle',
          }}
        >
          {R[props.themeKey]}
        </Text>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.secondary,
            height: 48,
            borderLeftWidth: 1,
            borderColor:theme.secondary,
          }}
        >
          <TextInput
            onChangeText={onUpdate}
            value={color}
            style={{
              flex: 1,
              height: '100%',
              color: 'white',
              textAlign: 'center',
              verticalAlign: 'middle',
              textShadowColor: 'black',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
              backgroundColor: valid ? color : theme.secondary,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            borderLeftWidth: 1,
            borderColor:theme.secondary,
            backgroundColor: iconPressed ? theme.onPressColorPrimary : theme.secondary,
            opacity: iconPressed ? 0.9 : 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}
        >
          <Pressable
            onPressIn={async () => {
              setIconPressed(true);
              await Vibration.notificationAsync(Vibration.NotificationFeedbackType.Success);
            }}
            onPressOut={() => setIconPressed(false)}
            onPress={() => setShowPicker(prev => !prev)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <Ionicons
              name={'color-palette'}
              adjustsFontSizeToFit={true}
              style={{
                color: valid ? color : theme.onSecondary,
                fontSize: 48,
                textShadowColor: 'black',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
              }}
            />
          </Pressable>
        </View>
      </View>
      {showPicker && <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 5,
          backgroundColor: theme.secondary,
        }}
      >
        <Input.Color
          colorInputPadding={5}
          colorInputWidth={WIDTH}
          colorInputHeight={45}
          pickerWidth={2}
          pickerHeight={50}
          borderRadius={5}
          onColorSelected={onUpdate}
        />
      </View>}
    </View>
  );
}
