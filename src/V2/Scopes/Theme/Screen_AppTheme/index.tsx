import React, { memo, useCallback, useMemo, useState } from 'react';

import {
  ThemeNames_APP,
  ThemeNamesArray_APP
} from '@V2/Types';

import { ConfigService } from '@V2/Services/ConfigService';
import { Animation } from '@V2/Animation/index';
import { Layout } from '@V2/Layout/index';
import { LC } from './__LC__';
import { TC } from './__TC__';

export const Screen_AppTheme = memo((props: {
  onAppThemeChange: () => void
  onScreenButton_ArrowBack: () => void
}) => {

  const config = useMemo(() => ConfigService.config, [ConfigService.config.appTheme]);
  const [selectedTheme, setSelectedTheme] = useState<ThemeNames_APP>(config.appTheme);

  const onThemeSelect = useCallback(async (theme: ThemeNames_APP) => {
    if (selectedTheme !== theme) {
      ConfigService.config.appTheme = theme;
      await ConfigService.saveConfig();
      setSelectedTheme(theme);
      props.onAppThemeChange();
    }
  }, [props.onAppThemeChange, selectedTheme]);

  const AllButtons = ThemeNamesArray_APP.map(theme => (
    <LC.ThemeButton
      key={theme}
      isSelected={selectedTheme === theme}
      themeName={theme}
      onPress={async () => await onThemeSelect(theme)}
    />
  ));

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
        <Layout.ScrollView
          contentContainerStyle={{
            paddingTop: 55,
            paddingRight: 1,
            gap: 1,
          }}
        >
          {AllButtons}
        </Layout.ScrollView>
      </Animation.SlideFromLeft>
    </Layout.Screen>
  );
});
