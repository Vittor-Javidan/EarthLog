import React, { memo, useCallback, useMemo, useState } from 'react';

import { ThemeNamesArray_APP, ThemeNames_APP } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import ConfigService from '@V1/Services/ConfigService';
import ThemeService from '@V1/Services/ThemeService';

import { Button } from '@V1/Button/index';

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
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.themes.app[config.language], []);

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
