import React, { memo, useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { translations } from '@V2/Translations/index';
import { ConfigService } from '@V2/Services/ConfigService';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { PopUpAPI } from '@V2/Layers/API/PopUp';

import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { Button } from '@V2/Button/index';
import { TC } from './__TC__';

export const Screen_ExportProject = memo((props: {
  id_project: string;
  onFihish: () => void;
  onScreenButton_ArrowBack: () => void;
}) => {

  const { id_project } = props;
  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.exportProject[config.language], []);

  const onDocxSelected = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'export project (DOCX)',
      id_project: id_project,
    }, () => props.onFihish());
  }, []);

  const onCSVSelected_GPS = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'export project GPS (CSV)',
      id_project: id_project,
    }, () => props.onFihish());
  }, []);

  const onCSVSelected_Measurements = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'export project compass measurements (CSV)',
      id_project: id_project,
    }, () => props.onFihish());
  }, []);

  const onZIPImagesSelected = useCallback(async () => {
    await PopUpAPI.handleAlert(true, {
      type: 'export project (ZIP IMAGES)',
      id_project: id_project,
    }, () => props.onFihish());
  }, []);

  return (
    <Layout.Screen
      screenButtons={
        <TC.ScreenButtons
          onArrowBackPress={() => props.onScreenButton_ArrowBack()}
        />
      }
    >
      <Animation.SlideFromLeft
        duration={200}
      >
        <Layout.ScrollView>
          <View
            style={{ gap: 1 }}
          >
            <Button.TextWithIcon
              title={R['DOCX']}
              iconName="file-word"
              onPress={async () => await onDocxSelected()}
              theme={{
                font:              theme.font_Button,
                font_active:       theme.font_active,
                background:        theme.background_Button,
                background_active: theme.background_active,
              }}
            />
            <Button.TextWithIcon
              title={R['CSV (GPS)']}
              iconName="page-csv"
              onPress={async () => await onCSVSelected_GPS()}
              iconSize={40}
              style={{
                paddingRight: 13,
              }}
              theme={{
                font:              theme.font_Button,
                font_active:       theme.font_active,
                background:        theme.background_Button,
                background_active: theme.background_active,
              }}
            />
            <Button.TextWithIcon
              title={R['CSV (Compass Measurements)']}
              iconName="page-csv"
              onPress={async () => await onCSVSelected_Measurements()}
              iconSize={40}
              style={{
                paddingRight: 13,
              }}
              theme={{
                font:              theme.font_Button,
                font_active:       theme.font_active,
                background:        theme.background_Button,
                background_active: theme.background_active,
              }}
            />
            <Button.TextWithIcon
              title={R['ZIP (Picture)']}
              iconName="file-zip"
              onPress={async () => await onZIPImagesSelected()}
              theme={{
                font:              theme.font_Button,
                font_active:       theme.font_active,
                background:        theme.background_Button,
                background_active: theme.background_active,
              }}
            />
          </View>
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
