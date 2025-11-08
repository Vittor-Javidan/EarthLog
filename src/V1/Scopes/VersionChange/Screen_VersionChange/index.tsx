import React, { memo, useCallback, useMemo } from 'react';

import { LTS_VERSION } from '@V1/Globals/Version';
import VersionManager, { AvailableVersions } from '@VersionManager';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Button } from '@V1/Button/index';
import { Animation } from '@V1/Animation/index';
import { Layout } from '@V1/Layout/index';
import { TC } from './__TC__';

export const Screen_VersionChange = memo((props: {
  onScreenButton_Home: () => void
  onPress_CurrentVersion: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);

  const onChangeVersion = useCallback(async (version: AvailableVersions) => {
    if (version === LTS_VERSION) {
      props.onPress_CurrentVersion()
      return;
    }
    await VersionManager.switchVersion(version);
  }, []);

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
            title={'Beta'}
            iconName="shuffle"
            onPress={async () => await onChangeVersion('V2')}
            theme={{
              font:              theme.font,
              font_active:       theme.font_active,
              background:        theme.background,
              background_active: theme.background_active,
            }}
          />
          <Button.TextWithIcon
            title={'LTS V1'}
            iconName="shuffle"
            onPress={async () => await onChangeVersion('V1')}
            theme={{
              font:              theme.font,
              font_active:       theme.font_active,
              background:        theme.background,
              background_active: theme.background_active,
            }}
          />
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
