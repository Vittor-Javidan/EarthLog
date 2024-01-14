import React, { memo, useMemo, useCallback } from 'react';

import { languageTags, LanguageTag } from '@V2/Types/AppTypes';
import { translations } from '@V2/Translations/index';
import ConfigService from '@V2/Services/ConfigService';
import ThemeService from '@V2/Services/ThemeService';

import { Button } from '@V2/Button/index';

export const LanguageButtons = memo((props: {
  onLanguageChange: (languageTag: LanguageTag) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);

  const onSelectLanguage = useCallback(async (languageTag: LanguageTag) => {
    if (config.language !== languageTag) {
      ConfigService.config.language = languageTag;
      await ConfigService.saveConfig();
      props.onLanguageChange(languageTag);
    }
  }, [props.onLanguageChange]);

  const AllButtons = languageTags.map((languageTag) => (
    <LanguageButton
      key={languageTag}
      languageTag={languageTag}
      isSelected={config.language === languageTag}
      onPress={async () => await onSelectLanguage(languageTag)}
    />
  ));

  return <>{AllButtons}</>;
});

const LanguageButton = memo((props: {
  languageTag: LanguageTag
  isSelected: boolean
  onPress: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);
  const R      = useMemo(() => translations.screen.LanguageSelection, []);

  return (
    <Button.TextWithIcon
      title={R[props.languageTag]}
      iconName="language"
      theme={{
        font:              props.isSelected ? theme.background : theme.font_Button,
        font_active:       props.isSelected ? theme.confirm    : theme.font_active,
        background:        props.isSelected ? theme.confirm    : theme.background_Button,
        background_active: props.isSelected ? theme.background : theme.background_active,
      }}
      onPress={() => props.onPress()}
    />
  );
});
