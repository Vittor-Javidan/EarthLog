import React, { memo, useCallback, useMemo, useState } from 'react';
import { ThemeNames_Widgets, ThemeNamesArray_Widgets } from '@V1/Types/AppTypes';

import { ConfigService } from '@V1/Services/ConfigService';

import { Layout } from '@V1/Layout/index';
import { LC } from './__LC__';

export const Screen_WidgetTheme = memo((props: {
  onWidgetThemeSelect: (themeName: ThemeNames_Widgets) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const [selectedTheme, setSelectedTheme] = useState<ThemeNames_Widgets>(config.widgetTheme);

  const onThemeSelect = useCallback(async (theme: ThemeNames_Widgets) => {
    if (selectedTheme !== theme) {
      ConfigService.config.widgetTheme = theme;
      await ConfigService.saveConfig();
      setSelectedTheme(theme);
      props.onWidgetThemeSelect(theme);
    }
  }, [props.onWidgetThemeSelect, selectedTheme]);

  const AllButtons = ThemeNamesArray_Widgets.map(theme => (
    <LC.ThemeButton
      key={theme}
      isSelected={selectedTheme === theme}
      themeName={theme}
      onPress={async () => await onThemeSelect(theme)}
    />
  ));

  return (
    <Layout.Screen
      screenButtons={<></>}
    >
      <Layout.ScrollView
        contentContainerStyle={{
          paddingTop: 55,
          paddingLeft: 1,
          gap: 1,
        }}
      >
        {AllButtons}
      </Layout.ScrollView>
    </Layout.Screen>
  );
});

