import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, Pressable, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemeDTO } from '@Services/ThemeService';
import ConfigService from '@Services/ConfigService';
import { Languages } from '@Services/LanguageService';

import { ColorPicker } from '@Components/ColorPicker';
import API_ExampleFigure from './API_ExampleFigure';
import { ThemeScreenTranslations, ThemeScreenTranslations_InputLabels, inputLabels, languages } from './translations';

export const ColorInput: Record<keyof ThemeDTO, React.FC> = {
  background: Background,
  onBackground: OnBackground,
  primary: Primary,
  onPrimary: OnPrimary,
  secondary: Secondary,
  onSecondary: OnSecondary,
  tertiary: Tertiary,
  onTertiary: OnTertiary,
  confirm: Confirm,
  onConfirm: OnConfirm,
  modified: Modified,
  onModified: OnModified,
  wrong: Wrong,
  onWrong: OnWrong,
  onPressColorPrimary: OnPressColorPrimary,
};

function Background(): JSX.Element          { return <Input themeKey="background"          savedValue={ConfigService.config.theme.background} />; }
function OnBackground(): JSX.Element        { return <Input themeKey="onBackground"        savedValue={ConfigService.config.theme.onBackground} />; }
function Primary(): JSX.Element             { return <Input themeKey="primary"             savedValue={ConfigService.config.theme.primary} />; }
function OnPrimary(): JSX.Element           { return <Input themeKey="onPrimary"           savedValue={ConfigService.config.theme.onPrimary} />; }
function Secondary(): JSX.Element           { return <Input themeKey="secondary"           savedValue={ConfigService.config.theme.secondary} />; }
function OnSecondary(): JSX.Element         { return <Input themeKey="onSecondary"         savedValue={ConfigService.config.theme.onSecondary} />; }
function Tertiary(): JSX.Element            { return <Input themeKey="tertiary"            savedValue={ConfigService.config.theme.tertiary} />; }
function OnTertiary(): JSX.Element          { return <Input themeKey="onTertiary"          savedValue={ConfigService.config.theme.onTertiary} />; }
function Confirm(): JSX.Element             { return <Input themeKey="confirm"             savedValue={ConfigService.config.theme.confirm} />; }
function OnConfirm(): JSX.Element           { return <Input themeKey="onConfirm"           savedValue={ConfigService.config.theme.onConfirm} />; }
function Modified(): JSX.Element            { return <Input themeKey="modified"            savedValue={ConfigService.config.theme.modified} />; }
function OnModified(): JSX.Element          { return <Input themeKey="onModified"          savedValue={ConfigService.config.theme.onModified} />; }
function Wrong(): JSX.Element               { return <Input themeKey="wrong"               savedValue={ConfigService.config.theme.wrong} />; }
function OnWrong(): JSX.Element             { return <Input themeKey="onWrong"             savedValue={ConfigService.config.theme.onWrong} />; }
function OnPressColorPrimary(): JSX.Element { return <Input themeKey="onPressColorPrimary" savedValue={ConfigService.config.theme.onPressColorPrimary} />; }

function Input(props: {
  themeKey: keyof ThemeDTO
  savedValue: string
}) {

  const { width: WIDTH } = useMemo(() => Dimensions.get('window'), []);
  const theme = useMemo<ThemeDTO>(() => ConfigService.config.theme, [ConfigService.config.theme]);
  const stringResources = useMemo<ThemeScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);
  const stringResources_InputLabels = useMemo<ThemeScreenTranslations_InputLabels[Languages]>(() => {
    return inputLabels[ConfigService.config.language];
  }, []);

  const [color, setColor] = useState<string>(props.savedValue);
  const [valid, setValid] = useState<boolean>(true);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [chevronPressed, setChevronPressed] = useState<boolean>(false);

  const isValid = useCallback((value: string) => {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return colorRegex.test(value);
  }, []);

  const onUpdate = useCallback((value: string) => {
    setColor(value);
    setValid(isValid(value));
    if (isValid(value)) {
      API_ExampleFigure.update(props.themeKey, value);
    }
  }, []);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.secondary,
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
          {stringResources['Invalid Color']}
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
          {stringResources_InputLabels[props.themeKey]}
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
            backgroundColor: chevronPressed ? theme.onPressColorPrimary : theme.secondary,
            opacity: chevronPressed ? 0.9 : 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}
        >
          <Pressable
            onPressIn={() => setChevronPressed(true)}
            onPressOut={() => setChevronPressed(false)}
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
          paddingVertical: 20,
          backgroundColor: theme.secondary,
        }}
      >
        <ColorPicker
          pickerWidth={WIDTH - 50}
          pickerCircleSize={20}
          pickerHeight={10}
          onColorSelected={onUpdate}
        />
      </View>}
    </View>
  );
}
