import React, { memo, useCallback, useMemo, useState } from 'react';

import { ThemeNamesArray_Widgets, ThemeNames_Widgets } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import { ThemeService } from '@V2/Services_Core/ThemeService';
import { ConfigService } from '@V2/Services/ConfigService';

import { Button } from '@V2/Button/index';

export const ThemeButtons = memo((props: {
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
    <ThemButton
      key={theme}
      isSelected={selectedTheme === theme}
      themeName={theme}
      onPress={async () => await onThemeSelect(theme)}
    />
  ));

  return <>{AllButtons}</>;
});

const ThemButton = memo((props: {
  isSelected: boolean
  themeName: ThemeNames_Widgets
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.themes.widget[config.language], []);
  const theme = ThemeService.appThemes[config.appTheme].component;

  return (
    <Button.TextWithIcon
      title={R[props.themeName]}
      theme={{
        font:              props.isSelected ? theme.background : theme.font_Button,
        font_active:       props.isSelected ? theme.confirm    : theme.font_active,
        background:        props.isSelected ? theme.confirm    : theme.background_Button,
        background_active: props.isSelected ? theme.background : theme.background_active,
      }}
      iconName="color-palette"
      onPress={() => props.onPress()}
    />
  );
});
