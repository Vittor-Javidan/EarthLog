import React, { memo, useMemo, useCallback } from 'react';

import { languageTags, LanguageTag } from '@V1/Types/AppTypes';
import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Button } from '@V1/Button/index';

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
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.drawerButton, []);
  const R      = useMemo(() => translations.screen.LanguageSelection, []);

  return (
    <Button.TextWithIcon
      title={R[props.languageTag]}
      iconName="language"
      theme={{
        font:              props.isSelected ? theme.font_confirm        : theme.font,
        font_active:       props.isSelected ? theme.background_confirm  : theme.font_active,
        background:        props.isSelected ? theme.background_confirm  : theme.background,
        background_active: props.isSelected ? theme.font_confirm        : theme.background_active,
      }}
      onPress={() => props.onPress()}
    />
  );
});
