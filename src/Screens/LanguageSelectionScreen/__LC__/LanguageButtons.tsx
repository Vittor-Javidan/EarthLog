import React, { useMemo } from 'react';

import { languageLabels, languageTags, LanguageTags } from '@Types/AppTypes';
import ConfigService from '@Services/ConfigService';
import ThemeService from '@Services/ThemeService';

import { Button } from '@Button/index';

export default function LanguageButtons(props: {
  onLangaugeSelected: (languageTag: LanguageTags) => void
}): JSX.Element {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  async function saveSelectedLanguage(languageTag: LanguageTags) {
    ConfigService.config.language = languageTag;
    await ConfigService.saveConfig();
  }

  const LanguageButtonsArray = languageLabels.map((languageLabel, index) => {

    const isSelected = config.language === languageTags[index];

    async function onSelectLanguage() {
      props.onLangaugeSelected(languageTags[index]);
      await saveSelectedLanguage(languageTags[index]);
    }

    return (
      <Button.TextWithIcon
        key={languageLabel}
        title={languageLabel}
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
