import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, Dimensions } from 'react-native';
import * as Vibration from 'expo-haptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Layout } from '@Components/Layout';
import { ThemeDTO } from '@Types/index';
import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';
import API_ExampleFigure from './API_ExampleFigure';
import UtilService from '@Services/UtilService';

const { width: WIDTH } = Dimensions.get('window');

export const ColorInput: Record<keyof ThemeDTO, React.FC> = {
  background: Background,
  onBackground: OnBackground,
  onBackground_Placeholder: OnBackground_Placeholder,
  primary: Primary,
  onPrimary: OnPrimary,
  onPrimary_Placeholder: OnPrimary_Placeholder,
  secondary: Secondary,
  onSecondary: OnSecondary,
  onSecondary_PlaceHolder: OnSecondary_Placeholder,
  tertiary: Tertiary,
  onTertiary: OnTertiary,
  onTertiary_Placeholder: OnTertiary_Placeholder,
  confirm: Confirm,
  onConfirm: OnConfirm,
  modified: Modified,
  onModified: OnModified,
  wrong: Wrong,
  onWrong: OnWrong,
  onPressColorPrimary: OnPressColorPrimary,
};

function Background(): JSX.Element                { return <CustomInput themeKey="background"               savedValue={ConfigService.config.theme.background} />; }
function OnBackground(): JSX.Element              { return <CustomInput themeKey="onBackground"             savedValue={ConfigService.config.theme.onBackground} />; }
function OnBackground_Placeholder(): JSX.Element  { return <CustomInput themeKey="onBackground_Placeholder" savedValue={ConfigService.config.theme.onBackground_Placeholder} />; }
function Primary(): JSX.Element                   { return <CustomInput themeKey="primary"                  savedValue={ConfigService.config.theme.primary} />; }
function OnPrimary(): JSX.Element                 { return <CustomInput themeKey="onPrimary"                savedValue={ConfigService.config.theme.onPrimary} />; }
function OnPrimary_Placeholder(): JSX.Element     { return <CustomInput themeKey="onPrimary_Placeholder"    savedValue={ConfigService.config.theme.onPrimary_Placeholder} />; }
function Secondary(): JSX.Element                 { return <CustomInput themeKey="secondary"                savedValue={ConfigService.config.theme.secondary} />; }
function OnSecondary(): JSX.Element               { return <CustomInput themeKey="onSecondary"              savedValue={ConfigService.config.theme.onSecondary} />; }
function OnSecondary_Placeholder(): JSX.Element   { return <CustomInput themeKey="onSecondary_PlaceHolder"  savedValue={ConfigService.config.theme.onSecondary_PlaceHolder} />; }
function Tertiary(): JSX.Element                  { return <CustomInput themeKey="tertiary"                 savedValue={ConfigService.config.theme.tertiary} />; }
function OnTertiary(): JSX.Element                { return <CustomInput themeKey="onTertiary"               savedValue={ConfigService.config.theme.onTertiary} />; }
function OnTertiary_Placeholder(): JSX.Element    { return <CustomInput themeKey="onTertiary_Placeholder"   savedValue={ConfigService.config.theme.onTertiary_Placeholder} />; }
function Confirm(): JSX.Element                   { return <CustomInput themeKey="confirm"                  savedValue={ConfigService.config.theme.confirm} />; }
function OnConfirm(): JSX.Element                 { return <CustomInput themeKey="onConfirm"                savedValue={ConfigService.config.theme.onConfirm} />; }
function Modified(): JSX.Element                  { return <CustomInput themeKey="modified"                 savedValue={ConfigService.config.theme.modified} />; }
function OnModified(): JSX.Element                { return <CustomInput themeKey="onModified"               savedValue={ConfigService.config.theme.onModified} />; }
function Wrong(): JSX.Element                     { return <CustomInput themeKey="wrong"                    savedValue={ConfigService.config.theme.wrong} />; }
function OnWrong(): JSX.Element                   { return <CustomInput themeKey="onWrong"                  savedValue={ConfigService.config.theme.onWrong} />; }
function OnPressColorPrimary(): JSX.Element       { return <CustomInput themeKey="onPressColorPrimary"      savedValue={ConfigService.config.theme.onPressColorPrimary} />; }

function CustomInput(props: {
  themeKey: keyof ThemeDTO
  savedValue: string
}) {

  const { config } = useMemo(() => ConfigService, []);
  const { language, theme } = useMemo(() => config, [config.theme]);
  const stringResources = useMemo(() => translations.Screens.ThemeScreen[language], []);

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
      API_ExampleFigure.update(props.themeKey, value);
    }
  }

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
          {stringResources[props.themeKey]}
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
        <Layout.Input.Color
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
