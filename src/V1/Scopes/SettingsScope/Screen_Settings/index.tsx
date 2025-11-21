import React, { memo, useCallback, useMemo, useState } from 'react';

import DevTools from '@DevTools';
import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';
import { HapticsService } from '@V1/Services/HapticsService';
import { AppService } from '@V1/Services/AppService';
import { NotificationAPI } from '@V1/Layers/API/Notification';
import { PopUpAPI } from '@V1/Layers/API/PopUp';
import { MapAPI } from '@V1/Layers/API/Map';

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
  const [tutorialMode          , setTutorialMode          ] = useState<boolean>(DevTools.TUTORIAL_MODE);
  const [autoSampleGPSReference, setAutoSampleGPSReference] = useState<boolean>(ConfigService.config.automaticSampleGPSReference);

  const toggleAutoSampleReferenceCoordinates = useCallback(async () => {
    ConfigService.config.automaticSampleGPSReference = !ConfigService.config.automaticSampleGPSReference;
    await ConfigService.saveConfig();
    setAutoSampleGPSReference(prev => !prev);
  }, []);
  
  const resetAllTutorials = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      question: 'Do you want to reset all tutorials? They will be shown again as if you were using the app for the first time.',
      type: 'warning',
    }, async() => {
      ConfigService.resetTutorials();
      await ConfigService.saveConfig();
    });
  }, []);

  const toggleTutorialMode = useCallback(async () => {
    await PopUpAPI.handleAlert(tutorialMode === false, {
      question: R['By enabling this, every single coordinate will be masked randomly. Use this if you are recording a video, streaming, or sharing your screen.'],
      type: 'warning',
    }, () => {
      DevTools.toggleTutorialMode();
      MapAPI.toggleTutorialMode();
      ConfigService.config.tutorialMode = !tutorialMode;
      ConfigService.saveConfig();
      NotificationAPI.setTutorialModeIcon(!tutorialMode);
      setTutorialMode(prev => !prev);
    });
  }, [tutorialMode]);

  // ========================================================================
  /** @WARNING This will whipe `ALL DATA` from the app                     */
  const onWhipeAllData = useCallback(async () => {                         //
    await PopUpAPI.handleAlert(true,                                       //
      {                                                                    //
        question: R['Want to whipe all your data? This is irreversible.'], //
        type: 'warning',                                                   //
      },                                                                   //
      async () => {                                                        //
        HapticsService.vibrate('success');                                 //
        await AppService.whipeAllData();                                   //
        props.onPress_WhipedAllData();                                     //
      }                                                                    //
    );                                                                     //
  }, []);                                                                  //
  // ========================================================================

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
            title={R['Auto Sample GPS Acquisition']}
            iconName="crosshairs-gps"
            onPress={async () => await toggleAutoSampleReferenceCoordinates()}
            theme={{
              font:              autoSampleGPSReference ? theme.font_confirm       : theme.font,
              font_active:       autoSampleGPSReference ? theme.background_confirm : theme.font_active,
              background:        autoSampleGPSReference ? theme.background_confirm : theme.background,
              background_active: autoSampleGPSReference ? theme.font_confirm       : theme.background_active,
            }}
          />
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
            title={R['Reset All Tutorials']}
            iconName="refresh-circle"
            onPress={() => resetAllTutorials()}
            theme={{
              font:              theme.font,
              font_active:       theme.font_active,
              background:        theme.background,
              background_active: theme.background_active,
            }}
          />
          <Button.TextWithIcon
            title={R['Tutorial Mode']}
            iconName="menu-book"
            onPress={() => toggleTutorialMode()}
            theme={{
              font:              tutorialMode ? theme.font_confirm       : theme.font,
              font_active:       tutorialMode ? theme.background_confirm : theme.font_active,
              background:        tutorialMode ? theme.background_confirm : theme.background,
              background_active: tutorialMode ? theme.font_confirm       : theme.background_active,
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
