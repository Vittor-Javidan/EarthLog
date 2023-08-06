import React, { useMemo } from 'react';
import { Layout } from '@Layout/index';

import { languageLabels, languageTags, LanguageTags } from '@Types/index';

import ConfigService from '@Services/ConfigService';

export default function LanguageButtons(props: {
  onButtonClick: () => void
}): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { theme, language } = useMemo(() => config, []);

  async function saveSelectedLanguage(languageTag: LanguageTags) {
    ConfigService.config.language = languageTag;
    await ConfigService.saveConfig();
  }

  return <>
    {
      languageLabels.map((languageLabel, index) => {
        const isSelected = language === languageTags[index];
        return (
          <Layout.Button.Text
            key={languageLabel}
            title={languageLabel}
            color_background={isSelected ? theme.confirm : undefined}
            color_font={isSelected ? theme.onConfirm : undefined}
            onPress={async () => {
              props.onButtonClick();
              await saveSelectedLanguage(languageTags[index]);
            }}
          />
        );
      })
    }
  </>;
}
