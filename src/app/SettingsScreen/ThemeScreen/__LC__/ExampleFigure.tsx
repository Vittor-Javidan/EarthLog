import React, { useState, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';

import { translations } from '@Translations/index';
import ConfigService from '@Services/ConfigService';

import { API } from '../__API__';

export function ExampleFigure(): JSX.Element {

  const { language, theme } = useMemo(() => ConfigService.config, []);
  const R = useMemo(() => translations.Screens.ThemeScreen[language], []);

  const temporaryTheme = useMemo(
    () => API.ExampleFigure.temporaryConfig ?? { ...theme },
  [API.ExampleFigure.temporaryConfig]);

  const [confirmPressed, setConfirmPressed] = useState<boolean>(false);
  const [modifiedPressed, setModifiedPressed] = useState<boolean>(false);
  const [wrongPressed, setWrongPressed] = useState<boolean>(false);
  const [_, refresh] = useState<boolean>(true);

  API.ExampleFigure.setterRegister(refresh, theme);

  return (
    <View
      style={{
        borderColor: '#FFF',
        borderWidth: 1,
      }}
    >
      <View
        style={{
          padding: 10,
          borderColor: '#000',
          borderWidth: 1,
          gap: 10,
          backgroundColor: temporaryTheme.background,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ paddingBottom: 5 }}>
            <Text style={{ color: temporaryTheme.onBackground }}>
              {R['onBackground']}
            </Text>
            <Text style={{ color: temporaryTheme.onBackground_Placeholder }}>
              {R['onBackground_Placeholder']}
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: temporaryTheme.primary,
          }}
        >
          <View style={{ paddingBottom: 5 }}>
            <Text style={{ color: temporaryTheme.onPrimary }}>
              {R['onPrimary']}
            </Text>
            <Text style={{ color: temporaryTheme.onPrimary_Placeholder }}>
              {R['onPrimary_Placeholder']}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: temporaryTheme.secondary,
            }}
          >
            <View style={{ paddingBottom: 5 }}>
              <Text style={{ color: temporaryTheme.onSecondary }}>
                {R['onSecondary']}
              </Text>
              <Text style={{ color: temporaryTheme.onSecondary_PlaceHolder }}>
                {R['onSecondary_PlaceHolder']}
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                backgroundColor: temporaryTheme.tertiary,
              }}
            >
              <View>
                <Text style={{ color: temporaryTheme.onTertiary }}>
                  {R['onTertiary']}
                </Text>
                <Text style={{ color: temporaryTheme.onTertiary_Placeholder }}>
                  {R['onTertiary_Placeholder']}
                </Text>
              </View>
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
              lineBreakStrategyIOS="push-out"
              numberOfLines={2}
            >
              {R['confirm']}
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
              {R['modified']}
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
              {R['wrong']}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
