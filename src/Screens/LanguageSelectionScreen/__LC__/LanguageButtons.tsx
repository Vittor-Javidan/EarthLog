import React, { useMemo } from 'react';

import { languageLabels, languageTags, LanguageTags } from '@Types/AppTypes';
import ConfigService from '@Services/ConfigService';

import { Button } from '@Button/index';

export default function LanguageButtons(props: {
  onLangaugeSelected: (languageTag: LanguageTags) => void
}): JSX.Element {

  const { theme, language } = useMemo(() => ConfigService.config, []);

  async function saveSelectedLanguage(languageTag: LanguageTags) {
    ConfigService.config.language = languageTag;
    await ConfigService.saveConfig();
  }

  const LanguageButtonsArray = languageLabels.map((languageLabel, index) => {

    const isSelected = language === languageTags[index];

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
          font: isSelected ? theme.onConfirm : theme.onSecondary,
          font_Pressed: isSelected ? theme.onConfirm : theme.onSecondary,
          background: isSelected ? theme.confirm : theme.secondary,
          background_Pressed: isSelected ? theme.confirm : theme.secondary,
        }}
        onPress={async () => await onSelectLanguage()}
      />
    );
  });

  return <>{LanguageButtonsArray}</>;
}
