import React, { useState, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';

import ConfigService from '@Services/ConfigService';
import { Languages } from '@Services/LanguageService';

import API_ExampleFigure from './API_ExampleFigure';
import { ThemeScreenTranslations, ThemeScreenTranslations_InputLabels, inputLabels, languages } from './translations';

export function ExampleFigure(props: {
  locked: boolean
  onPressLock: () => void
}): JSX.Element {

  const temporaryTheme = useMemo(() => API_ExampleFigure.temporaryConfig ?? { ...ConfigService.config.theme }, [API_ExampleFigure.temporaryConfig]);
  const stringResources = useMemo<ThemeScreenTranslations[Languages]>(() => {
    return languages[ConfigService.config.language];
  }, []);
  const stringResources_InputLabels = useMemo<ThemeScreenTranslations_InputLabels[Languages]>(() => {
    return inputLabels[ConfigService.config.language];
  }, []);

  const [lockedPressed, setLockedPressed] = useState<boolean>(false);
  const [confirmPressed, setConfirmPressed] = useState<boolean>(false);
  const [modifiedPressed, setModifiedPressed] = useState<boolean>(false);
  const [wrongPressed, setWrongPressed] = useState<boolean>(false);
  const [_, refresh] = useState<boolean>(true);

  API_ExampleFigure.setterRegister(refresh, ConfigService.config.theme);

  return (
    <View
      style={{
        borderColor: '#FFF',
        borderWidth: 2,
      }}
    >
      <View
        style={{
          padding: 10,
          borderColor: '#000',
          borderWidth: 2,
          gap: 10,
          backgroundColor: temporaryTheme.background,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: temporaryTheme.onBackground,
            }}
          >
            {stringResources_InputLabels['onBackground']}
          </Text>
          <Pressable
            onPressIn={() => setLockedPressed(true) }
            onPressOut={() => setLockedPressed(false)}
            onPress={() => {
              props.onPressLock();
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              backgroundColor: lockedPressed ? temporaryTheme.onPressColorPrimary : temporaryTheme.secondary,
            }}
          >
            <Text>
              {props.locked ?  stringResources['unlock'] : stringResources['lock']}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: temporaryTheme.primary,
          }}
        >
          <Text
            style={{
              paddingBottom: 10,
              color: temporaryTheme.onPrimary,
            }}
          >
            {stringResources_InputLabels['onPrimary']}
          </Text>
          <View
            style={{
              padding: 10,
              backgroundColor: temporaryTheme.secondary,
            }}
          >
            <Text
              style={{
                paddingBottom: 10,
                color: temporaryTheme.onSecondary,
              }}
            >
              {stringResources_InputLabels['onSecondary']}
            </Text>
            <View
              style={{
                padding: 10,
                backgroundColor: temporaryTheme.tertiary,
              }}
            >
              <Text
                style={{
                  paddingBottom: 10,
                  color: temporaryTheme.onTertiary,
                }}
              >
                {stringResources_InputLabels['onTertiary']}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Pressable
            onPressIn={() => { setConfirmPressed(true); }}
            onPressOut={() => { setConfirmPressed(false); }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
              padding: 10,
              backgroundColor: confirmPressed
                ? temporaryTheme.onPressColorPrimary
                : temporaryTheme.confirm,
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              style={{
                fontSize: 12,
                color: temporaryTheme.onConfirm,
              }}
            >
              {stringResources_InputLabels['confirm']}
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => { setModifiedPressed(true); }}
            onPressOut={() => { setModifiedPressed(false); }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
              padding: 12,
              backgroundColor: modifiedPressed
                ? temporaryTheme.onPressColorPrimary
                : temporaryTheme.modified,
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              style={{
                fontSize: 12,
                color: temporaryTheme.onModified,
              }}
            >
              {stringResources_InputLabels['modified']}
            </Text>
          </Pressable>
          <Pressable
            onPressIn={() => { setWrongPressed(true); }}
            onPressOut={() => { setWrongPressed(false); }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
              padding: 10,
              backgroundColor: wrongPressed
                ? temporaryTheme.onPressColorPrimary
                : temporaryTheme.wrong,
            }}
          >
            <Text
              adjustsFontSizeToFit={true}
              style={{
                fontSize: 12,
                color: temporaryTheme.onWrong,
              }}
            >
              {stringResources_InputLabels['wrong']}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
