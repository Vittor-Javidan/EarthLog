import React, { useMemo } from 'react';
import { Layout } from '@Layout/index';

import { languageLabels, languageTags, LanguageTags } from '@Types/index';

import ConfigService from '@Services/ConfigService';

export default function AllButtons(props: {
  selectedLanguage: LanguageTags
  onButtonClick: (languageTag: LanguageTags) => void
}): JSX.Element {

  const { config } = useMemo(() => ConfigService, []);
  const { theme } = useMemo(() => config, []);

  return <>
    {
      languageLabels.map((languageLabel, index) => {
        const isSelected = props.selectedLanguage === languageTags[index];
        return (
          <Layout.Button.Text
            key={languageLabel}
            title={languageLabel}
            color_background={isSelected ? theme.confirm : undefined}
            color_font={isSelected ? theme.onConfirm : undefined}
            onPress={() => props.onButtonClick(languageTags[index])}
          />
        );
      })
    }
  </>;
}
