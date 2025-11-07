import React, { memo, useCallback, useMemo } from 'react';

import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';
import { HapticsService } from '@V1/Services/HapticsService';
import { AppService } from '@V1/Services/AppService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { Button } from '@V1/Button/index';
import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';

export const Screen_Settings = memo((props: {
  onPress_LanguageSelection: () => void
  onPress_DateAndTime: () => void
  onPress_Themes: () => void
  onPress_Vibration: () => void
  onPress_WhipedAllData: () => void
  onScreenButton_Home: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.screen.settings[config.language], []);

  // ====================================================
  /** @WARNING This will whipe `ALL DATA` from the app */
  const onWhipeAllData = useCallback(async () => {     //
    await PopUpAPI.handleAlert(true,                   //
      {                                                //
        question: 'Want to whipe database?',           //
        type: 'warning',                               //
      },                                               //
      async () => {                                    //
        HapticsService.vibrate('success');             //
        await AppService.whipeAllData();               //
        props.onPress_WhipedAllData();                 //
      }                                                //
    );                                                 //
  }, []);                                              //
  // ====================================================

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onHomePress={() => props.onScreenButton_Home()}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <Layout.ScrollView
          contentContainerStyle={{ gap: 1 }}
        >
          <Button.TextWithIcon
            title={R['Language']}
            iconName="language"
            onPress={() => props.onPress_LanguageSelection()}
            theme={{
              font:              theme.font,
              font_active:       theme.font_active,
              background:        theme.background,
              background_active: theme.background_active,
            }}
          />
          <Button.TextWithIcon
            title={R['Date and time']}
            iconName="time"
            onPress={() => props.onPress_DateAndTime()}
            theme={{
              font:              theme.font,
              font_active:       theme.font_active,
              background:        theme.background,
              background_active: theme.background_active,
            }}
          />
          <Button.TextWithIcon
            title={R['Themes']}
            iconName="color-palette"
            onPress={() => props.onPress_Themes()}
            theme={{
              font:              theme.font,
              font_active:       theme.font_active,
              background:        theme.background,
              background_active: theme.background_active,
            }}
          />
          <Button.TextWithIcon
            title={R['Vibration']}
            iconName="alert-circle"
            onPress={() => props.onPress_Vibration()}
            theme={{
              font:              theme.font,
              font_active:       theme.font_active,
              background:        theme.background,
              background_active: theme.background_active,
            }}
          />
          <Button.TextWithIcon
            title={R['Whipe ALL DATA']}
            iconName="trash-outline"
            onPress={async () => onWhipeAllData()}
            theme={{
              font:              theme.font_wrong,
              background:        theme.background_wrong,
              font_active:       theme.background_wrong,
              background_active: theme.font_wrong,
            }}
          />
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
