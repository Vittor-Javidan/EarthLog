import React, { memo, useCallback, useMemo, useState } from 'react';

import { ThemeNamesArray_APP, ThemeNames_APP } from '@Types/AppTypes';
import ConfigService from '@Services/ConfigService';

import { Button } from '@Button/index';
import ThemeService from '@Services/ThemeService';
import { translations } from '@Translations/index';

export const ThemeButtons = memo((props: {
  onAppThemeChange: () => void
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
  themeName: ThemeNames_APP
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.themes.appThemes[config.language], []);
  const theme = ThemeService.appThemes[config.appTheme].component;

  return (
    <Button.TextWithIcon
      title={R[props.themeName]}
      theme={{
        font:               props.isSelected ? theme.background : theme.font_Button,
        font_Pressed:       props.isSelected ? theme.confirm    : theme.font_active,
        background:         props.isSelected ? theme.confirm    : theme.background_Button,
        background_Pressed: props.isSelected ? theme.background : theme.background_active,
      }}
      iconName="color-palette"
      onPress={() => props.onPress()}
    />
  );
});
