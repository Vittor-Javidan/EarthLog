import React, { useMemo } from 'react';

import { languageTags, LanguageTag } from '@Types/AppTypes';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';

export default function LanguageButtons(props: {
  onLangaugeSelected: (languageTag: LanguageTag) => void
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  async function saveSelectedLanguage(languageTag: LanguageTag) {
    ConfigService.config.language = languageTag;
    await ConfigService.saveConfig();
  }

  const LanguageButtonsArray = languageTags.map((languageTag) => {

    const isSelected = config.language === languageTag;

    async function onSelectLanguage() {
      props.onLangaugeSelected(languageTag);
      await saveSelectedLanguage(languageTag);
    }

    return (
      <Button.TextWithIcon
        key={languageTag}
        title={languageTag}
        iconName="language"
        iconSide="Right"
        theme={{
          font: isSelected ? theme.background : theme.font_Button,
          font_Pressed: isSelected ? theme.confirm : theme.font,
          background: isSelected ? theme.confirm : theme.background_Button,
          background_Pressed: isSelected ? theme.background : theme.background,
        }}
        onPress={async () => await onSelectLanguage()}
      />
    );
  });

  return <>{LanguageButtonsArray}</>;
}
