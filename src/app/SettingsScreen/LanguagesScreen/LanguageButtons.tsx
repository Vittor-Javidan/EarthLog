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
          <Layout.Button
            key={languageLabel}
            title={languageLabel}
            overrideBackgroundColor={isSelected ? theme.confirm : undefined}
            overrideTextColor={isSelected ? theme.onConfirm : undefined}
            onPress={() => props.onButtonClick(languageTags[index])}
          />
        );
      })
    }
  </>;
}